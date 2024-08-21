import { prisma } from "@/prisma";
import DeleteBtn from "./DeleteBtn";
import TicketStatus from "@/components/TicketStatus";
import { Button } from "@/components/ui/button";
import SaveBtn from "./SaveBtn";
import EditTicketForm from "./EditTicketForm";

const SingleTicket = async ({ params }: { params: { ticketid: string } }) => {
  const ticket = await prisma.tasks.findUnique({
    where: {
      id: parseInt(params.ticketid),
    },
  });

  //console.log("my ticket: ", ticket);

  return (
    <div className="p-4">
      <EditTicketForm params={params} ticket={ticket}/>
    </div>
  );
};

export default SingleTicket;
