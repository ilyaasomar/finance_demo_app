import bcrypt from "bcrypt";

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(body);
  const user = await prisma.users.create({
    data: {
      fullname: name,
      email,
      password:hashedPassword,
    },
  });
  return NextResponse.json("user");
}
