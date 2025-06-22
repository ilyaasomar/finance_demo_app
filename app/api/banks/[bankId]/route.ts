import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { bankId: string } }
) {
  try {
    const body = await req.json();
    const {
      info: {
        userId,
        values: { bank_name, account_name, account_number },
      },
    } = body;
    // check if account exist
    const existAccount = await db.account.findUnique({
      where: { id: params.bankId, user_id: userId },
    });

    if (!existAccount) {
      throw new NextResponse("Account not found");
    }

    // update account
    const account = await db.account.update({
      where: { id: params.bankId, user_id: userId },
      data: {
        bank_name,
        account_name,
        account_number,
      },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bankId: string } }
) {
  try {
    const account = await db.account.findUnique({
      where: { id: params.bankId },
    });
    if (!account) {
      throw new NextResponse("Account not found");
    }

    const deletedAccount = await db.account.delete({
      where: { id: params.bankId },
    });
    return NextResponse.json(deletedAccount, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
