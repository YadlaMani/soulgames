"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserAccount, updateUserBalance } from "@/actions";

const DiceGame = () => {
  const [showRules, setShowRules] = useState(true);
  const [currentDie, setCurrentDie] = useState(1);
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState("");
  const [userAccount, setUserAccount] = useState(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (publicKey) {
        try {
          console.log("Fetching account for publicKey:", publicKey.toString());
          const account = await getUserAccount(publicKey.toString());
          setUserAccount(account);
          setBalance(account.lamports);
          console.log("Account fetched:", account);
        } catch (error) {
          console.error("Error fetching user account:", error);
        }
      } else {
        setUserAccount(null);
        setBalance(0);
      }
    };

    fetchUserAccount();
  }, [publicKey]);

  const closeRules = () => setShowRules(false);

  const rollDice = async (guess) => {
    const newRoll = Math.floor(Math.random() * 6) + 1;
    const newBalance =
      guess === "higher" && newRoll > currentDie
        ? balance + bet
        : balance - bet;

    setBalance(newBalance);
    const response = await updateUserBalance(publicKey, newBalance);
    setMessage(
      guess === "higher" && newRoll > currentDie
        ? `You won! New balance: ${newBalance} LAM`
        : `You lost. New balance: ${newBalance} LAM`
    );

    setCurrentDie(newRoll);
  };

  const handleBetChange = (e) => {
    const value = Number(e.target.value);
    if (value <= 0) {
      setMessage("Bet must be greater than zero.");
    } else if (value > balance) {
      setMessage(`Bet cannot exceed your balance of ${balance} LAM.`);
    } else {
      setMessage("");
      setBet(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-4 space-y-4 shadow-lg">
        <h2 className="text-center">Dice Game</h2>
        <p className="text-center">Current Die: {currentDie}</p>
        <p className="text-center">Balance: {balance} LAM</p>

        <div className="flex justify-center space-x-2">
          <Button color="primary" onClick={() => rollDice("higher")}>
            Higher
          </Button>
          <Button color="secondary" onClick={() => rollDice("lower")}>
            Lower
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <span>Bet:</span>
          <Input
            type="number"
            value={bet}
            onChange={handleBetChange}
            className="text-center"
            min="1"
            step="1"
            bordered
            fullWidth
            placeholder="Enter bet"
          />
        </div>

        {message && (
          <p className="text-center text-lg text-red-500">{message}</p>
        )}
      </Card>
    </div>
  );
};

export default DiceGame;
