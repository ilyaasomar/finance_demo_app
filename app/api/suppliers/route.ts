import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { supplier_name, phone, address } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }
    // check if supplier already exist
    const oldSupplier = await db.supplier.findFirst({
      where: {
        supplier_name: supplier_name,
      },
    });
    if (oldSupplier) {
      return new NextResponse("Supplier already exist", { status: 409 });
    }
    // proceed
    const customer = await db.supplier.create({
      data: { supplier_name, phone, address, user_id: userId },
    });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
