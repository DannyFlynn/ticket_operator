"use client";

import { useState } from "react";
import { employees } from "../users/page";
import { useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import { useRouter } from "next/navigation";
import Unauthorized from "@/components/Unauthorized";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 2 characters.",
  }),

});

const CreateTicketPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();


  const [selectedUser, setSelectedUser] = useState(employees[0].name);
  const [deleting, setDeleting] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  if(session?.user?.email !== "john@example.com"){
    return <Unauthorized />
 }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDeleting(true);
    const taskData = {
      created: new Date(),
      title: values.title,
      user: selectedUser,
      status: false,
    };
    //console.log(taskData)
    try {
      const response = await fetch("http://localhost:3000/api/tickets/create", {
        method: "POST",
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      const result = await response.json();
      console.log("create response:", result);
      window.location.href = "/";
      //router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  }

  

  return (
    <div className="p-3 flex  justify-center items-center my-8 lg:my-26">
      <Card className="w-full md:w-2/4 lg:w-1/4 min-h-60">
        <CardHeader>
          <CardTitle>Add Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Select onValueChange={setSelectedUser}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder={selectedUser} />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee, id) => (
                    <SelectItem key={id} value={employee.name}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicketPage;
