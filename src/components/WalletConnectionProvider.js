"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { getUserAccount } from "../actions";

export default function WalletConnectionProvider({ children }) {
  const { publicKey } = useWallet();
  const [userAccount, setUserAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (publicKey) {
        try {
          const account = await getUserAccount(publicKey.toString());
          setUserAccount(account);
          setError(null);
        } catch (error) {
          console.error("Error fetching user account:", error);
          setError("Failed to fetch user account");
        }
      } else {
        setUserAccount(null);
        setError(null);
      }
    };

    if (isClient) {
      fetchUserAccount();
    }
  }, [publicKey, isClient]);

  if (!isClient) {
    return null;
  }

  return children({ userAccount, error });
}
