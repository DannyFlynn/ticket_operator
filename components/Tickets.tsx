import { prisma } from "@/prisma";
import { tickets } from "./FakeData";
import { Tickets as TicketProps } from "@/types";
import Chart from "./Chart";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MoreItems from "./MoreItems";
import GetTickets from "./GetTickets";

interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    admin?: boolean;
  };
}



const Tickets = async () => {
  const data: any = await getServerSession(authOptions);

  //for pagination logic <MoreItems />
  const ticketCount = await prisma.tasks.count()


  return (
    <div className="w-full flex-col lg:flex-row justify-center items-center">
      <GetTickets ticketCount={ticketCount} />
      {/* <Chart data={tickets} /> */}
    </div>
  );
};

export default Tickets;
