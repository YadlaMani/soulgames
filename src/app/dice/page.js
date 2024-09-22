"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserAccount, updateUserBalance } from "@/actions";
import * as ed25519 from "@noble/ed25519";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import bs58 from "bs58";
import { useDisclosure } from "@nextui-org/modal";

const DiceGame = () => {
  const [showRules, setShowRules] = useState(true);
  const [currentDie, setCurrentDie] = useState(
    Math.floor(Math.random() * 6) + 1
  );
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState("");
  const [userAccount, setUserAccount] = useState(null);
  const [showIframe, setShowIframe] = useState(false); // New state for iframe visibility
  const { publicKey, signMessage } = useWallet();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (publicKey) {
        try {
          const account = await getUserAccount(publicKey.toString());
          setUserAccount(account);
          setBalance(account.lamports);
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

  const signAndRollDice = async (guess) => {
    if (!publicKey) return;

    // Prevent betting if bet exceeds balance
    if (bet > balance) {
      setMessage(`Insufficient balance. You only have ${balance} LAM.`);
      return;
    }

    const message = `Rolling the dice for ${guess}`;
    const encodedMessage = new TextEncoder().encode(message);

    try {
      const signature = await signMessage(encodedMessage);
      const signatureUint8 = new Uint8Array(signature);

      const isValid = await ed25519.verifyAsync(
        signatureUint8,
        encodedMessage,
        publicKey.toBytes()
      );

      if (!isValid) {
        throw new Error("Message signature invalid!");
      }

      console.log("Signature verified successfully");
      setMessage("Signature verified, rolling the dice...");

      // Show the iframe for 2 seconds
      setShowIframe(true);
      setTimeout(() => {
        setShowIframe(false); // Hide the iframe after 2 seconds
        rollDice(guess); // Then roll the dice
      }, 2000);
    } catch (error) {
      console.error("Message signing or verification failed:", error);
      setMessage("Message signing failed. Please try again.");
    }
  };

  const rollDice = async (guess) => {
    const newRoll = Math.floor(Math.random() * 6) + 1;
    const win = guess === "higher" && newRoll > currentDie;
    const loss = guess === "lower" && newRoll < currentDie;

    // Ensure balance doesn't go negative
    if (!win && !loss && balance - bet < 0) {
      setMessage("Insufficient funds to continue playing.");
      return;
    }

    const newBalance = win ? balance + bet : balance - bet;
    if (newBalance < 0) {
      setMessage("Insufficient balance for this bet.");
      return;
    }

    setBalance(newBalance);
    await updateUserBalance(publicKey, newBalance);
    setCurrentDie(newRoll);
    setMessage(
      win
        ? `You won! New balance: ${newBalance} LAM`
        : `You lost. New balance: ${newBalance} LAM`
    );
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Dice Game
        </h2>
        <p className="text-lg text-center text-gray-700">
          Current Die: {currentDie}
        </p>
        <p className="text-lg text-center text-gray-700">
          Balance: {balance} LAM
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          <Button
            color="primary"
            onClick={() => signAndRollDice("higher")}
            className="w-24"
          >
            Higher
          </Button>
          <Button
            color="secondary"
            onClick={() => signAndRollDice("lower")}
            className="w-24"
          >
            Lower
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-4">
          <span className="text-gray-700">Bet:</span>
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
          <p className="text-center text-lg text-red-500 mt-4">{message}</p>
        )}
      </Card>

      {/* Show iframe only when showIframe is true */}
      {showIframe && (
        <iframe
          src="https://lottie.host/embed/eb405d5f-8f0c-46f4-b61b-cc73760ea57a/8XOR8ILWt4.json"
          className="mt-6"
        ></iframe>
      )}

      <Button color="secondary" onPress={onOpen} className="mt-6">
        Open Rules
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                Dice & Nice
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-700">
                  1. You start with your current balance.
                  <br />
                  2. The current die value is shown.
                  <br />
                  3. Bet on whether the next roll will be higher or lower.
                  <br />
                  4. If you guess correctly, you double your bet.
                  <br />
                  5. If you guess wrong, you lose your bet.
                  <br />
                  6. Adjust your bet amount as desired.
                  <br />
                  7. Play wisely and have fun!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Got it!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DiceGame;
