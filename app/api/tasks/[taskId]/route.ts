import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await req.json();
    const {
      info: {
        userId,
        values: {
          subject,
          status,
          priority,
          description,
          expected_start_date,
          expected_end_date,
        },
      },
    } = body;
    // check if account exist
    const existTask = await db.task.findUnique({
      where: { id: params.taskId, user_id: userId },
    });

    if (!existTask) {
      throw new NextResponse("Task not found");
    }

    // update account
    const task = await db.task.update({
      where: { id: params.taskId, user_id: userId },
      data: {
        subject,
        status,
        priority,
        description,
        expected_start_date,
        expected_end_date,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await db.task.findUnique({
      where: { id: params.taskId },
    });
    if (!task) {
      throw new NextResponse("Task not found");
    }

    const deletedTask = await db.task.delete({
      where: { id: params.taskId },
    });
    return NextResponse.json(deletedTask, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
