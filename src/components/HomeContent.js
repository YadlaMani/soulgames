"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function HomeContent() {
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center p-8 md:p-16 text-center md:text-left">
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl font-bold mb-6">Welcome to SoulGames</h1>
          {publicKey ? (
            <div>
              <p>Welcome, Enjoy ur time here!</p>
            </div>
          ) : (
            <div>
              <p>Connect Ur Wallet to play</p>
            </div>
          )}
          <WalletMultiButton />

          <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg">
              <GameFeature
                title="Solana Powered"
                description="Experience lightning-fast transactions on the Solana blockchain."
                bgColor="bg-purple-100"
              />
              <GameFeature
                title="Decentralized Gaming"
                description="Enjoy true ownership of your in-game assets through NFTs."
                bgColor="bg-blue-100"
              />
              <GameFeature
                title="Blockchain Security"
                description="Play with confidence knowing your assets are protected by cutting-edge cryptography."
                bgColor="bg-green-100"
              />
              <GameFeature
                title="Instant Withdrawals"
                description="Cash out your winnings quickly with Solana's rapid finality."
                bgColor="bg-yellow-100"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2">
          <iframe
            src="https://lottie.host/embed/6251996f-b9d2-4897-9e7a-8124cfca2306/sU9ZilIRYN.json"
            className="w-full h-[500px]"
            style={{
              border: "none",
            }}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function GameFeature({ title, description, bgColor }) {
  return (
    <div
      className={`${bgColor} p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
