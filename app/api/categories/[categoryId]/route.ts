import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { category_name } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if category exist
    const checkCategory = await db.category.findUnique({
      where: { id: params.categoryId },
    });
    if (!checkCategory) {
      return new NextResponse("category not found", { status: 409 });
    }
    // proceed

    const updatedCategory = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: { category_name },
    });
    return NextResponse.json(updatedCategory, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if category exist
    const checkCategory = await db.category.findUnique({
      where: { id: params.categoryId },
    });
    if (!checkCategory) {
      return new NextResponse("category not found", { status: 409 });
    }
    // proceed
    const deletedCategory = await db.category.delete({
      where: { id: params.categoryId },
    });
    return NextResponse.json(deletedCategory, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
