import React from "react";
import { useOutletContext } from "react-router-dom";
import { formatEther } from "viem";

const Tokens = () => {
  const tokens = useOutletContext();
  console.log(tokens);
  return (
    <div className="tokens">
      <h2>Tokens Overview</h2>
      <div className="tokenDetail">
        {tokens?.data?.map((token) => (
          <div className="token">
            <h4>Token: {token?.name}</h4>
            <h4>Symbol: {token?.symbol}</h4>
            <h5>Token Address: {token?.token_address}</h5>
            <pre>Balance: {formatEther(token?.balance)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tokens;
