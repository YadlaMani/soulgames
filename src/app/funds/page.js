"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserAccount, updateUserBalance } from "@/actions";
import { Tabs, Tab } from "@nextui-org/tabs";

const Funds = () => {
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (publicKey) {
        try {
          const account = await getUserAccount(publicKey.toString());
          setBalance(account.lamports);
        } catch (error) {
          console.error("Error fetching user account:", error);
        }
      } else {
        setBalance(0);
      }
    };

    fetchUserAccount();
  }, [publicKey]);

  const handleWithdraw = async () => {
    const amountToWithdraw = Number(withdrawAmount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setMessage("Please enter a valid amount to withdraw.");
      return;
    }

    if (amountToWithdraw > balance) {
      setMessage(
        `Insufficient balance. Your current balance is ${balance} LAM.`
      );
      return;
    }

    try {
      const newBalance = balance - amountToWithdraw;
      if (newBalance < 0) {
        setMessage(
          "Withdrawal would result in a negative balance, which is not allowed."
        );
        return;
      }

      setBalance(newBalance);
      await updateUserBalance(publicKey, newBalance);
      setMessage(
        `Successfully withdrew ${amountToWithdraw} LAM. New balance: ${newBalance} LAM.`
      );
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      setMessage("Error processing your withdrawal. Please try again.");
    }
  };

  const handleDeposit = async () => {
    const amountToDeposit = Number(depositAmount);

    if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
      setMessage("Please enter a valid amount to deposit.");
      return;
    }

    try {
      const newBalance = balance + amountToDeposit;
      setBalance(newBalance);
      await updateUserBalance(publicKey, newBalance);
      setMessage(
        `Successfully deposited ${amountToDeposit} LAM. New balance: ${newBalance} LAM.`
      );
    } catch (error) {
      console.error("Error processing deposit:", error);
      setMessage("Error processing your deposit. Please try again.");
    }
  };

  const handleWithdrawAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleDepositAmountChange = (e) => {
    setDepositAmount(e.target.value);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-6">
      <Tabs aria-label="Funds Options" className="w-full max-w-3xl">
        {/* Withdraw Tab */}
        <Tab key="Withdraw" title="Withdraw">
          <Card className="shadow-lg w-full p-6 rounded-lg bg-white">
            <CardBody>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Withdraw Funds
              </h2>
              <p className="text-lg text-center text-gray-700 mb-4">
                Current Balance:{" "}
                <span className="font-semibold">{balance} LAM</span>
              </p>
              <div className="flex flex-col items-center space-y-6">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={handleWithdrawAmountChange}
                  className="text-center"
                  min="1"
                  step="1"
                  bordered
                  fullWidth
                  placeholder="Enter withdrawal amount"
                  size="lg"
                />
                <Button
                  color="primary"
                  onClick={handleWithdraw}
                  className="w-full max-w-xs"
                >
                  Withdraw
                </Button>
                {message && (
                  <p className="text-center text-lg text-red-500">{message}</p>
                )}
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Deposit Tab */}
        <Tab key="Deposit" title="Deposit">
          <Card className="shadow-lg w-full p-6 rounded-lg bg-white">
            <CardBody>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Deposit Funds
              </h2>
              <p className="text-lg text-center text-gray-700 mb-4">
                Current Balance:{" "}
                <span className="font-semibold">{balance} LAM</span>
              </p>
              <div className="flex flex-col items-center space-y-6">
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={handleDepositAmountChange}
                  className="text-center"
                  min="1"
                  step="1"
                  bordered
                  fullWidth
                  placeholder="Enter deposit amount"
                  size="lg"
                />
                <Button
                  color="primary"
                  onClick={handleDeposit}
                  className="w-full max-w-xs"
                >
                  Deposit
                </Button>
                {message && (
                  <p className="text-center text-lg text-red-500">{message}</p>
                )}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Funds;
