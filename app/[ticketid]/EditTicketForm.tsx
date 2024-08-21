"use client";
import { employees } from "@/employees";
import { useState } from "react";
import { useForm } from "react-hook-form";

import SaveBtn from "./SaveBtn";
import DeleteBtn from "./DeleteBtn";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/Unauthorized";

type TicketProps = {
  ticket: {
    id: number;
    created: Date;
    title: string;
    user: string;
    status: boolean;
  } | null;
};

const EditTicketForm = ({
  ticket,
  params,
}: TicketProps & { params: { ticketid: string } }) => {
  const { data: session, status } = useSession();

  const form = useForm({
    defaultValues: {
      title: ticket?.title || "",
      user: ticket?.user || "",
    },
  });

  const [deleting, setDeleting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    ticket?.status ? "complete" : "open"
  );

  const [user, setUser] = useState(ticket?.user);
  //console.log(user)
  async function onSubmit(values: any) {
    setDeleting(true);
    const taskData = {
      title: values.title,
      user: user,
      status: selectedStatus === "complete" ? true : false,
    };
    console.log(taskData);

    const status = selectedStatus === "complete" ? true : false;

    if (
      values.title === ticket?.title &&
      user === ticket?.user &&
      ticket?.status === status
    ) {
      console.log("No changes detected, no need to save.", ticket);
      return;
    }
    console.log("Changes detected, saving");
    try {
      const response = await fetch(
        `http://localhost:3000/api/tickets/${params.ticketid}`,
        {
          method: "PATCH",
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      const result = await response.json();
      console.log("Update response:", result);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="p-3 flex  justify-center items-center my-8 lg:my-26">
      {session?.user?.email === "john@example.com" ? (
        <Card className="w-full md:w-2/4 lg:w-1/4 min-h-60">
          <CardHeader>
            <CardTitle>Edit Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder={ticket?.title} {...field} />
                      </FormControl>
                      <FormDescription>
                        Edit the title of the task.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Select onValueChange={setUser}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={ticket?.user} />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee, id) => (
                      <SelectItem key={id} value={employee.name}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={selectedStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
                <SaveBtn deleting={deleting} />
                <DeleteBtn params={params} />
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full md:w-2/4 lg:w-1/4 min-h-60">
          <CardHeader>
            <CardTitle>Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="my-6">
              <p>{ticket?.title}</p>
            </div>
            <div className="my-6">
              <p>{ticket?.user}</p>
            </div>
            <div className="my-6">
              <p>{selectedStatus}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditTicketForm;
