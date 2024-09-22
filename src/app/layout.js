"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { Providers } from "./providers";
import "../app/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function RootLayout({ children }) {
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <NextUIProvider>
                <Providers>
                  {children}
                  <ToastContainer />
                </Providers>
              </NextUIProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
