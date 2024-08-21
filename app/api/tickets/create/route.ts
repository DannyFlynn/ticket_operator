import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function POST(req: NextRequest,){
try {
    const data = await req.json();
    //console.log(data);

    // Create a new task in the database
    const newTask = await prisma.tasks.create({
        data: {
            created: data.created,
            title: data.title,
            user: data.user,
            status: data.status,
        },
    });

    return NextResponse.json({ msg: "success", task: newTask }, { status: 201 });

} catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ msg: "error", error: error }, { status: 500 });
}
}