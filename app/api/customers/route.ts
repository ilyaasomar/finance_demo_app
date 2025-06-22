import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { customer_name, phone, address } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }
    // check if category already exist
    const oldCustomer = await db.customer.findFirst({
      where: {
        customer_name: customer_name,
      },
    });
    if (oldCustomer) {
      return new NextResponse("Customer already exist", { status: 409 });
    }
    // proceed
    const customer = await db.customer.create({
      data: { customer_name, phone, address, user_id: userId },
    });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
