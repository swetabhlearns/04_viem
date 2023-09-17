import React, { useState } from "react";
import { ConnectPublicClient, ConnectWalletClient } from "../client";
import { formatEther } from "viem";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const WalletButton = () => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(BigInt(0));
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signature = await walletClient.signMessage({
        account,
        message: "Sign this message to authenticate your account.",
      });

      const [address] = await walletClient.getAddresses();
      setAddress(address);
    } catch (error) {
      console.error(error);
    }
  }
  function Status({ address }) {
    if (!address) {
      return <div>Disconnected</div>;
    }
    return (
      <div>
        <div>address: {address}</div>
      </div>
    );
  }

  async function getNativeBalanceFromMoralis(param) {
    try {
      axios
        .get(
          `https://deep-index.moralis.io/api/v2.2/${address}/${param}?chain=mumbai`,
          {
            headers: {
              "X-API-Key": `aoAf6tFNGQ7CQzvdH3Z1RS22It8AsVoMsXEJo8qP9BhQb35qqSr00ddjpRNilNoL`,
            },
          }
        )
        .then((res) => setBalance(res))
        .then(() => navigate(`/${param}`));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <>
        {address && <Status address={address} balance={balance} />}
        {!address && <button onClick={handleClick}>Wallet Connect</button>}
        {address && (
          <button
            onClick={() => {
              getNativeBalanceFromMoralis("balance");
            }}
          >
            Get Balance
          </button>
        )}
        {address && (
          <button
            onClick={() => {
              getNativeBalanceFromMoralis("erc20");
            }}
          >
            Get all Tokens
          </button>
        )}
        {address && (
          <button
            onClick={() => {
              getNativeBalanceFromMoralis("nft/collections");
            }}
          >
            Get NFT Collections
          </button>
        )}

        {address && (
          <button
            onClick={() => {
              setAddress(null);
              setBalance(BigInt(0));
              navigate("/");
            }}
          >
            Reset
          </button>
        )}
        <div className="outlet">
          <Outlet context={balance} />
        </div>
      </>
    </div>
  );
};

export default WalletButton;
