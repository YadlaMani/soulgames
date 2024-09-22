"use server";

import connectToDB from "@/database";
import UserAccount from "../models/UserAccount";

export async function getUserAccount(publicAddress) {
  await connectToDB();

  try {
    let userAccount = await UserAccount.findOne({ publicAddress });

    if (!userAccount) {
      userAccount = await UserAccount.create({ publicAddress, lamports: 100 });
    }

    return {
      publicAddress: userAccount.publicAddress,
      lamports: userAccount.lamports,
      createdAt: userAccount.createdAt,
      updatedAt: userAccount.updatedAt,
    };
  } catch (error) {
    console.error("Error in getUserAccount:", error);
    throw new Error("Failed to fetch user account");
  }
}
