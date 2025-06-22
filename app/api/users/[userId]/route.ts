import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { fullname, email, oldPassword, newPassword } = body;
    // check if user exist
    const user = await db.users.findUnique({ where: { id: params.userId } });
    if (!user) {
      return new NextResponse("User not found", { status: 400 });
    }

    // check if the email changed
    const checkEmail = await db.users.findUnique({
      where: { id: params.userId, email: email },
    });

    if (checkEmail) {
      // check if there any password posted
      if (newPassword) {
        // check if the password matched the old password retype
        const isCorrectPassword = await bcrypt.compare(
          oldPassword,
          user?.password
        );

        if (!isCorrectPassword) {
          return new NextResponse("Invalid old password", { status: 404 });
        } else {
          //check if new password same as old password
          if (oldPassword === newPassword) {
            return new NextResponse("New Password can't same old password", {
              status: 401,
            });
          } else {
            const hashPassword = await bcrypt.hash(newPassword, 12);

            const updatedUser = await db.users.update({
              where: { id: params.userId },
              data: {
                fullname: fullname,
                email: email,
                password: hashPassword,
              },
            });
            return NextResponse.json(updatedUser, { status: 201 });
          }
        }
      } else {
        const updatedUser = await db.users.update({
          where: { id: params.userId },
          data: {
            fullname: fullname,
            email: email,
          },
        });
        return NextResponse.json(updatedUser, { status: 201 });
      }
    } else {
      // check if the email already exist you can't update
      const isEmailChanged = await db.users.findUnique({
        where: { email: email },
      });

      if (!isEmailChanged) {
        if (newPassword) {
          // check if the password matched the old password retype
          const isCorrectPassword = await bcrypt.compare(
            oldPassword,
            user?.password
          );

          if (!isCorrectPassword) {
            return new NextResponse("Invalid old password", { status: 401 });
          } else {
            //check if new password same as old password
            if (oldPassword === newPassword) {
              return new NextResponse("New Password can't same old password", {
                status: 401,
              });
            } else {
              const hashedPassword = await bcrypt.hash(newPassword, 12);
              const updatedUser = await db.users.update({
                where: { id: params.userId },
                data: {
                  fullname: fullname,
                  email: email,
                  password: hashedPassword,
                },
              });
              return NextResponse.json(updatedUser, { status: 201 });
            }
          }
        } else {
          const updatedUser = await db.users.update({
            where: { id: params.userId },
            data: {
              fullname: fullname,
              email: email,
            },
          });
          return NextResponse.json(updatedUser, { status: 201 });
        }
      } else {
        return new NextResponse("Email already exist", { status: 402 });
      }
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await db.users.findUnique({ where: { id: params.userId } });
    if (!user) {
      return new NextResponse("User not found", { status: 400 });
    }
    const deletedUser = await db.users.delete({ where: { id: params.userId } });
    return NextResponse.json(deletedUser, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
