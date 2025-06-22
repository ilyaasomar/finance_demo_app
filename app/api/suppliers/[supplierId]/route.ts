import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { supplierId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { supplier_name, phone, address } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if supplier exist
    const checkSupplier = await db.supplier.findUnique({
      where: { id: params.supplierId },
    });
    if (!checkSupplier) {
      return new NextResponse("Supplier not found", { status: 409 });
    }
    // proceed

    const updatedSupplier = await db.supplier.update({
      where: {
        id: params.supplierId,
        user_id: userId,
      },
      data: { supplier_name, phone, address },
    });
    return NextResponse.json(updatedSupplier, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { supplierId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if supplier exist
    const checkSupplier = await db.supplier.findUnique({
      where: { id: params.supplierId },
    });
    if (!checkSupplier) {
      return new NextResponse("Supplier not found", { status: 409 });
    }
    // proceed
    const deletedSupplier = await db.supplier.delete({
      where: { id: params.supplierId },
    });
    return NextResponse.json(deletedSupplier, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
