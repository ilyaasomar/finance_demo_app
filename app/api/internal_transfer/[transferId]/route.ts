import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { transferId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    const { from_account, to_account, amount, registered_date } =
      await req.json();
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // xaqiiji transfer ki hore sidee accounts kula ahaayeen.
    const checkTransfer = await db.internalTransfer.findUnique({
      where: {
        id: params.transferId,
      },
    });

    if (!checkTransfer) {
      return new NextResponse("Internal transfer not found", {
        status: 403,
      });
    }
    // check if both account is same
    const isSameAccount = from_account === to_account;
    if (isSameAccount) {
      return new NextResponse("You can't transfer money same account", {
        status: 409,
      });
    }

    // marka hore so bandhig from balance ku jiro
    const checkFromAccount = await db.account.findUnique({
      where: { id: checkTransfer.from_account },
    });
    // marka hore so bandhig to account balance ku jiro
    const checkToAccount = await db.account.findUnique({
      where: { id: checkTransfer.to_account },
    });

    const fromAmount = checkFromAccount?.balance! + checkTransfer.amount;
    const toAmount = checkToAccount?.balance! - checkTransfer.amount;

    // hubi accounts ka is badal miyaa lagu soo sameeye

    // hadi aan lagu sameyn isbadal
    if (
      checkTransfer.from_account === from_account &&
      checkTransfer.to_account === to_account
    ) {
      const updatedFromAmount = fromAmount - amount;
      const updatedToAmount = toAmount + amount;

      const updateTransfer = await db.internalTransfer.update({
        where: { id: params.transferId },
        data: {
          from_account,
          to_account,
          amount: amount,
          registered_date: registered_date,
        },
      });

      if (updateTransfer) {
        await db.account.update({
          where: { id: checkTransfer.from_account },
          data: {
            balance: updatedFromAmount,
          },
        });
        await db.account.update({
          where: { id: checkTransfer.to_account },
          data: {
            balance: updatedToAmount,
          },
        });
      }
    }

    // hadi from account la badalin lkn to account la badalo

    if (
      checkTransfer.from_account === from_account &&
      checkTransfer.to_account !== to_account
    ) {
      // soo bandhig account ka lo wareege xogtiisa

      const newToAccount = await db.account.findUnique({
        where: { id: to_account },
      });

      if (!newToAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }
      const newFromAccountBalance = fromAmount - amount;
      const newToAccountBalance = newToAccount.balance + amount;

      // update transfer
      const updateTransfer = await db.internalTransfer.update({
        where: { id: params.transferId },
        data: {
          from_account,
          to_account,
          amount: amount,
          registered_date: registered_date,
        },
      });

      if (updateTransfer) {
        await db.account.update({
          where: { id: checkTransfer.to_account },
          data: {
            balance: toAmount,
          },
        });
        await db.account.update({
          where: { id: to_account },
          data: {
            balance: newToAccountBalance,
          },
        });
      }

      return NextResponse.json(updateTransfer, { status: 201 });
    }
    if (
      checkTransfer.from_account !== from_account &&
      checkTransfer.to_account === to_account
    ) {
      // soo bandhig xogta account ka laga waregayo
      const PreviousFromAccount = await db.account.findUnique({
        where: { id: checkTransfer.from_account },
      });
      if (!PreviousFromAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }
      const PreviousFromAccountBalance =
        PreviousFromAccount.balance + checkTransfer.amount;

      // soo bandhig account ka lo wareega xogtiisa
      const newFromToAccount = await db.account.findUnique({
        where: { id: from_account },
      });

      if (!newFromToAccount) {
        return new NextResponse("From To Account not found", { status: 409 });
      }

      const newToAccount = await db.account.findUnique({
        where: { id: to_account },
      });

      const newFromToAccountBalance = newFromToAccount.balance - amount;

      const newToAccountBalance = newToAccount?.balance! - checkTransfer.amount;
      const newToAccountBalanceUpdate = newToAccountBalance + amount;

      // update transfer
      const updateTransfer = await db.internalTransfer.update({
        where: { id: params.transferId },
        data: {
          from_account,
          to_account,
          amount: amount,
          registered_date: registered_date,
        },
      });

      if (updateTransfer) {
        // update previous from account
        await db.account.update({
          where: { id: checkTransfer.from_account },
          data: {
            balance: PreviousFromAccountBalance,
          },
        });
        // update new from account
        await db.account.update({
          where: { id: from_account },
          data: {
            balance: newFromToAccountBalance,
          },
        });
        // update to account
        await db.account.update({
          where: { id: to_account },
          data: {
            balance: newToAccountBalanceUpdate,
          },
        });
      }

      return NextResponse.json(updateTransfer, { status: 201 });
    }

    // xaqiiji from iyo to hadi lees daba marsiiyo

    if (
      checkTransfer.from_account === to_account &&
      checkTransfer.to_account === from_account
    ) {
      const PreviousFromAccount = await db.account.findUnique({
        where: { id: checkTransfer.from_account },
      });
      if (!PreviousFromAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }
      // soo bandhig xogta account ka laga waregayo oo ah to account
      const PreviousToAccount = await db.account.findUnique({
        where: { id: checkTransfer.to_account },
      });
      if (!PreviousToAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }

      // soo bandhig account ka lo wareega xogtiisa oo ah from account
      const newFromToAccount = await db.account.findUnique({
        where: { id: from_account },
      });

      if (!newFromToAccount) {
        return new NextResponse("From To Account not found", { status: 409 });
      }

      // soo bandhig account ka lo wareega xogtiisa oo ah to account
      const newToAccount = await db.account.findUnique({
        where: { id: to_account },
      });

      if (!newToAccount) {
        return new NextResponse("From To Account not found", { status: 409 });
      }

      const PreviousFromAccountBalance =
        PreviousFromAccount.balance + checkTransfer.amount;
      const PreviousToAccountBalance =
        PreviousToAccount.balance - checkTransfer.amount;

      const newFromAccountBalance = newFromToAccount?.balance! - amount;
      let newToAccountBalanceUpdate = 0;
      // xaqiiji account ka lo wareejinaa in uu yahay kii laga soo wareejiye marki hore

      newToAccountBalanceUpdate = newToAccount.balance + amount;

      // update transfer
      const updateTransfer = await db.internalTransfer.update({
        where: { id: params.transferId },
        data: {
          from_account,
          to_account,
          amount: amount,
          registered_date: registered_date,
        },
      });

      if (updateTransfer) {
        // update previous from account
        await db.account.update({
          where: { id: checkTransfer.from_account },
          data: {
            balance: newToAccountBalanceUpdate,
          },
        });
        // update previous to account
        await db.account.update({
          where: { id: checkTransfer.to_account },
          data: {
            balance: PreviousToAccountBalance,
          },
        });
        // update new from account
        await db.account.update({
          where: { id: from_account },
          data: {
            balance: newFromAccountBalance,
          },
        });
        // update to account
        await db.account.update({
          where: { id: to_account },
          data: {
            balance: newToAccountBalanceUpdate,
          },
        });
      }
      return NextResponse.json(updateTransfer, { status: 201 });
    }

    // hadi labada account FROM & TO la badalo
    else {
      // soo bandhig xogta account ka laga waregayo oo ah from account
      const PreviousFromAccount = await db.account.findUnique({
        where: { id: checkTransfer.from_account },
      });
      if (!PreviousFromAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }
      // soo bandhig xogta account ka laga waregayo oo ah to account
      const PreviousToAccount = await db.account.findUnique({
        where: { id: checkTransfer.to_account },
      });
      if (!PreviousToAccount) {
        return new NextResponse("Account not found", { status: 409 });
      }

      // soo bandhig account ka lo wareega xogtiisa oo ah from account
      const newFromToAccount = await db.account.findUnique({
        where: { id: from_account },
      });

      if (!newFromToAccount) {
        return new NextResponse("From To Account not found", { status: 409 });
      }

      // soo bandhig account ka lo wareega xogtiisa oo ah to account
      const newToAccount = await db.account.findUnique({
        where: { id: to_account },
      });

      if (!newToAccount) {
        return new NextResponse("From To Account not found", { status: 409 });
      }

      const PreviousFromAccountBalance =
        PreviousFromAccount.balance + checkTransfer.amount;
      const PreviousToAccountBalance =
        PreviousToAccount.balance - checkTransfer.amount;

      const newFromAccountBalance = newFromToAccount?.balance! - amount;
      const newToAccountBalanceUpdate = newToAccount.balance + amount;

      // update transfer
      const updateTransfer = await db.internalTransfer.update({
        where: { id: params.transferId },
        data: {
          from_account,
          to_account,
          amount: amount,
          registered_date: registered_date,
        },
      });

      if (updateTransfer) {
        // update previous from account
        await db.account.update({
          where: { id: checkTransfer.from_account },
          data: {
            balance: PreviousFromAccountBalance,
          },
        });
        // update previous to account
        await db.account.update({
          where: { id: checkTransfer.to_account },
          data: {
            balance: PreviousToAccountBalance,
          },
        });
        // update new from account
        await db.account.update({
          where: { id: from_account },
          data: {
            balance: newFromAccountBalance,
          },
        });
        // update to account
        await db.account.update({
          where: { id: to_account },
          data: {
            balance: newToAccountBalanceUpdate,
          },
        });
      }
      return NextResponse.json(updateTransfer, { status: 201 });
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// delete
export async function DELETE(
  req: Request,
  { params }: { params: { transferId: string } }
) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;
  try {
    // if the user authonticated
    if (!userId) {
      return new NextResponse("Unauthoticated please login", { status: 401 });
    }

    // check if transfer exist
    const checkTransfer = await db.internalTransfer.findUnique({
      where: { id: params.transferId, user_id: userId },
    });

    if (!checkTransfer) {
      return new NextResponse("internal transfer not found", { status: 409 });
    }

    // fetch from account balance
    const fromAccount = await db.account.findFirst({
      where: { id: checkTransfer.from_account },
    });
    // fetch to account balance
    const toAccount = await db.account.findFirst({
      where: { id: checkTransfer.to_account },
    });

    // generate new balance
    let newFromBalance = fromAccount?.balance! + checkTransfer?.amount;
    let newToBalance = toAccount?.balance! - checkTransfer?.amount;

    // xaqiiji account ka lacagta laga celina lacag ku filan maku jirtaa
    // @ts-ignore
    if (toAccount?.balance < checkTransfer.amount) {
      return new NextResponse(
        "You can not delete this transfer becouse account will be minus",
        { status: 500 }
      );
    }

    // detele transfer and update account
    const deleteTransfer = await db.internalTransfer.delete({
      where: {
        id: params.transferId,
        user_id: userId,
      },
    });
    if (deleteTransfer) {
      // update from account
      await db.account.update({
        where: { id: fromAccount?.id },
        data: {
          balance: newFromBalance,
        },
      });
      // update to account
      await db.account.update({
        where: { id: toAccount?.id },
        data: {
          balance: newToBalance,
        },
      });
    }
    return NextResponse.json(deleteTransfer, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
