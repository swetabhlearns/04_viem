import React from "react";
import { useOutletContext } from "react-router-dom";
import { formatEther } from "viem";

const Balance = () => {
  const balance = useOutletContext();
  console.log(balance);
  return (
    <div className="balance">
      balance: {formatEther(balance?.data?.balance)}
    </div>
  );
};

export default Balance;
