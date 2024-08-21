//delete ticket

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    try {
    const { id } =  params;
    if (!id) {
      return NextResponse.json({ message: 'Ticket ID is required' }, { status: 400 });
    }

    const deletedTicket = await prisma.tasks.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Ticket deleted successfully', deletedTicket });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json({ message: 'Failed to delete ticket' }, { status: 500 });
  }
}


//update ticket
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){


  try {
  const data = await req.json();
  const { title, user, status } = await data;
  //console.log("STATUSSSSSSSSSS: ", status);
  const { id }  = params

  
  const ticketUpdate = await prisma.tasks.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      user,
      status,
    },
  })

  //console.log(updateTicket);

  return NextResponse.json({message: "PATCH REQUEST CONNECTED", ticket: ticketUpdate});

} catch(err) {

  console.log(err);
}
}