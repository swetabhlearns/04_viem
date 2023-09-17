import axios from "axios";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Collections = () => {
  const [nft, setNfts] = useState([]);
  const [nftDetails, setNftDetails] = useState({});
  const [token_id, set_token_id] = useState(null);
  const [token_add, set_token_add] = useState(null);
  const collections = useOutletContext();
  console.log(nftDetails, token_id);

  function handleCollectionNFTs(param) {
    try {
      axios
        .get(
          `https://deep-index.moralis.io/api/v2.2/nft/${param}?chain=mumbai`,
          {
            headers: {
              "X-API-Key": `aoAf6tFNGQ7CQzvdH3Z1RS22It8AsVoMsXEJo8qP9BhQb35qqSr00ddjpRNilNoL`,
            },
          }
        )
        .then((res) => setNfts(res))
        .then(() => set_token_add(param));
    } catch (e) {
      console.error(e);
    }
  }
  function handleNFTdetails(address, tokenID) {
    try {
      axios
        .get(
          `https://deep-index.moralis.io/api/v2.2/nft/${address}/${tokenID}?chain=mumbai`,
          {
            headers: {
              "X-API-Key": `aoAf6tFNGQ7CQzvdH3Z1RS22It8AsVoMsXEJo8qP9BhQb35qqSr00ddjpRNilNoL`,
            },
          }
        )
        .then((res) => setNftDetails(res.data))
        .then(() => set_token_id(tokenID));
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="collections">
      <h2>Collections List</h2>
      <div className="collectionsList">
        {collections.data.result
          .filter((item) => item.symbol !== "ACO")
          .map((item) => (
            <div className="collection" key={item.token_address}>
              <h4>{item.name}</h4>
              <pre>{item.token_address}</pre>
              {token_add !== item?.token_address && (
                <button
                  onClick={() => handleCollectionNFTs(item.token_address)}
                >
                  Load Collection Nfts
                </button>
              )}
            </div>
          ))}
      </div>
      {nft && (
        <div className="nftList">
          {nft?.data?.result.map((item) => {
            const metadata = JSON.parse(item.metadata);
            return (
              <div
                className="collectionNft"
                key={item?.token_id}
                onClick={async () => {
                  handleNFTdetails(item?.token_address, item?.token_id);
                }}
              >
                <div className="nftImg">
                  <img
                    src={`${metadata.media[0].mediaLink}`}
                    alt=""
                    className="nft_img"
                  />
                </div>
                <h4>{metadata.name}</h4>
                {token_id === item?.token_id
                  ? nftDetails && (
                      <div>
                        <h4>Collection name: {nftDetails.name}</h4>
                        <h4>Asset Type: {nftDetails.symbol}</h4>
                        <h4>Owner: {nftDetails.owner_of}</h4>
                        <h4>Name: {JSON.parse(nftDetails.metadata).name}</h4>
                        <h4>Name: {JSON.parse(nftDetails.metadata).name}</h4>
                      </div>
                    )
                  : null}
              </div>
            );
          })}
          {/* {nftDetails && token_id && (
            <div className="itemDetail">
              <h5>{nftDetails.data.name}</h5>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Collections;
