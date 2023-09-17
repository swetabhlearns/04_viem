import { createWalletClient, createPublicClient, http, custom } from "viem";

import { polygonMumbai } from "viem/chains";

import "viem/window";

export function ConnectWalletClient() {
  //check for window.ethereum

  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage = "Install Metamask";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: polygonMumbai,
    transport: transport,
  });
  return walletClient;
}

export function ConnectPublicClient() {
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage = "Metamask Install crowww";

    throw new Error(errorMessage);
  }
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: transport,
  });
  return publicClient;
}
