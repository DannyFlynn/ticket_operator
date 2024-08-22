"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { prisma } from "@/prisma";
import { Tickets as TicketProps } from "@/types";
import Link from "next/link";
import MoreItems from "./MoreItems";
import Loading from "@/app/loading";

const URL = process.env.URL

const GetTickets = ({ ticketCount }: { ticketCount: number }) => {

  console.log("hello vercel")
  const [tickets, setTickets] = useState<any[]>([]);
  const [takeNum, setTakeNum] = useState(5);
  const [skipNum, setSkipNum] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const url = process.env.NEXT_PUBLIC_URL;
      try {
        const response = await fetch(
          `https://dynamic-youtiao-1e6a4b.netlify.app/api/tickets/gettickets?take=${takeNum}&skip=${skipNum}`
        );
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTickets();
  }, [takeNum, skipNum]);


  const individualTicket = (id: number) => {
    const url = process.env.NEXT_PUBLIC_URL;
    router.push(`${url}/${id}`);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center  min-h-96 my-12">
      {tickets.length > 0 ? (
        <>
          <table className="w-11/12 h-[550px]">
            <thead className="">
              <tr className="grid grid-cols-6 lg:grid-cols-8 gap-4 text-center py-2 px-2 border-b-2 w-full">
                <th className="col-span-2 lg:col-span-3">Title</th>
                <th className="col-span-2 lg:col-span-2">User</th>
                <th className="hidden lg:col-span-2 lg:block">Date</th>
                <th className="col-span-2 lg:col-span-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  className="grid grid-cols-6 lg:grid-cols-8 gap-4 text-center py-2 border-b-2 w-full h-24  overflow-hidden"
                  key={ticket.id}
                  onClick={() => individualTicket(ticket.id)}
                >
                  <td className="col-span-2 lg:col-span-3 ">{ticket.title}</td>
                  <td className="col-span-2 lg:col-span-2">
                    {ticket.user || "Not Assigned"}
                  </td>
                  <td className="hidden lg:col-span-2 lg:block">
                    {new Date(ticket.created).toLocaleDateString("en-GB")}
                  </td>
                  <td className="col-span-2 lg:col-span-1">
                    {ticket.status ? "Complete" : "Open"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <MoreItems
            takeNum={takeNum}
            skipNum={skipNum}
            setTakeNum={setTakeNum}
            setSkipNum={setSkipNum}
            ticketCount={ticketCount}
          />
        </>
      ) : (
        <div className="w-full mt-16 flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default GetTickets;
