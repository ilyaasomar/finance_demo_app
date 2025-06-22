import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { customer_name, phone, address } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if customer exist
    const checkCustomer = await db.customer.findUnique({
      where: { id: params.customerId },
    });
    if (!checkCustomer) {
      return new NextResponse("Customer not found", { status: 409 });
    }
    // proceed

    const updatedCustomer = await db.customer.update({
      where: {
        id: params.customerId,
        user_id: userId,
      },
      data: { customer_name, phone, address },
    });
    return NextResponse.json(updatedCustomer, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if customer exist
    const checkCustomer = await db.customer.findUnique({
      where: { id: params.customerId },
    });
    if (!checkCustomer) {
      return new NextResponse("Customer not found", { status: 409 });
    }
    // proceed
    const deletedCustomer = await db.customer.delete({
      where: { id: params.customerId },
    });
    return NextResponse.json(deletedCustomer, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
