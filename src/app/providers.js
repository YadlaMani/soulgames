"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import Header from "../components/Header";
import WalletConnectionProvider from "../components/WalletConnectionProvider";

export function Providers({ children }) {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletConnectionProvider>
            {({ userAccount, error }) => (
              <>
                <Header userAccount={userAccount} />
                <main>{children}</main>
              </>
            )}
          </WalletConnectionProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
