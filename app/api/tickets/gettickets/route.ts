import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function GET(req: NextRequest){

    const { searchParams } = new URL(req.url);
    const takeNum = parseInt(searchParams.get('take') || '0', 10);
    const skipNum = parseInt(searchParams.get('skip') || '0', 10);

    const tickets = await prisma.tasks.findMany({
            take: takeNum,
            skip: skipNum,
      });

    console.log("server tickets: ", tickets)

    return NextResponse.json({tickets: tickets}, {status: 200})


}