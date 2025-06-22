import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      info: {
        userId,
        values: { account_name },
      },
    } = body;
    // check if account already exist
    const oldAccount = await db.facilityAccounts.findUnique({
      where: { account_name },
    });
    if (oldAccount) {
      return new NextResponse("Account name already exist", { status: 409 });
    }
    // proceed;
    const account = await db.facilityAccounts.create({
      data: { account_name, user_id: userId },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
