"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, } from 'wagmi/chains';
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const config = getDefaultConfig({ appName: 'My RainbowKit App', projectId: 'YOUR_PROJECT_ID', chains: [mainnet], ssr: true, });
const queryClient = new QueryClient();


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}