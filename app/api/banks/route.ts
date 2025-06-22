import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      info: {
        userId,
        values: { bank_name, account_name, account_number },
      },
    } = body;
    // check if account already exist
    const oldAccount = await db.account.findUnique({
      where: { account_number },
    });
    if (oldAccount) {
      return new NextResponse("Account Number already exist", { status: 409 });
    }
    // proceed;
    const account = await db.account.create({
      data: { bank_name, account_name, account_number, user_id: userId },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
