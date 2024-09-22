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
import { Providers } from "./providers";
import "../app/globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <Providers>{children}</Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
