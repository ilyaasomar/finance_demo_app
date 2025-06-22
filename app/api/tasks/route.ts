import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    // check if account already exist
    // const oldTask = await db.account.findFirst({
    //   where: { subject: subject },
    // });
    // if (oldTask) {
    //   return new NextResponse("Account Number already exist", { status: 409 });
    // }
    // proceed;
    const task = await db.task.create({
      data: {
        subject,
        status,
        priority,
        description,
        expected_start_date,
        expected_end_date,
        user_id: userId,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
