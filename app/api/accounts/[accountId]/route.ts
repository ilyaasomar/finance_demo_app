import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  try {
    const body = await req.json();
    const {
      info: {
        userId,
        values: { account_name },
      },
    } = body;
    // check if account exist
    const existAccount = await db.facilityAccounts.findUnique({
      where: { id: params.accountId, user_id: userId },
    });

    if (!existAccount) {
      throw new NextResponse("Account not found");
    }

    // update account
    const account = await db.facilityAccounts.update({
      where: { id: params.accountId, user_id: userId },
      data: {
        account_name,
      },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  try {
    const account = await db.facilityAccounts.findUnique({
      where: { id: params.accountId },
    });
    if (!account) {
      throw new NextResponse("Account not found");
    }

    const deletedAccount = await db.facilityAccounts.delete({
      where: { id: params.accountId },
    });
    return NextResponse.json(deletedAccount, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
