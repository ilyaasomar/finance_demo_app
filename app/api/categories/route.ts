import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { category_name } = await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }
    // check if category already exist
    const oldCategory = await db.category.findFirst({
      where: {
        category_name: category_name,
      },
    });
    if (oldCategory) {
      return new NextResponse("category already exist", { status: 409 });
    }
    // proceed
    const category = await db.category.create({
      data: { category_name, user_id: userId },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {

    return new NextResponse("Internal server error", { status: 500 });
  }
}
