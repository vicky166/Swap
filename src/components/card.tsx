"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputSec, setInputSec] = useState("");
  const [sellToken, setSellToken] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (sellToken && buyToken && inputOne) {
      const sellAmount = parseFloat(inputOne) * Math.pow(10, 18);

      const url = `https://api.0x.org/swap/v1/price?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${sellAmount}`;

      axios
        .get(url, {
          headers: { "0x-api-key": "f8a0dc95-a1b2-424b-9f91-839ea88e3e43" },
        })
        .then((response) => {
          console.log("API Response:", response.data);
          setPrice(response.data.price);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  }, [sellToken, buyToken, inputOne]);

  const clearSellToken = () => {
    setSellToken("");
    setInputOne("");
    setPrice("");
  };

  const clearBuyToken = () => {
    setBuyToken("");
    setInputSec("");
    setPrice("");
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl mt-[100px] ml-[800px] bg-black rounded-[30px]">
      <figure className="px-10 pt-10">
        <div className="justify-self-start ml-[10px] mt-[-25px]">
          <div className="badge bg-black text-white border-black">Market</div>
          <button className="badge bg-black text-white border-black">Limit</button>
          <button className="badge bg-black text-white border-black">Cross Chain</button>
        </div>
        <br />
      </figure>

      <div className="card-body">
        <div className="container">
          <div className="card-title text-xs ml-[8px] text-red-600">Sell</div>
          <div className="flex justify-between">
            <div className="dropdown dropdown-left dropdown-end">
              <select
                className="select w-full max-w-xs text-white"
                onChange={(e) => setSellToken(e.target.value)}
                value={sellToken}
              >
                <option disabled value="">
                  Pick your Token
                </option>
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">ETH</option>
                <option value="0x6b175474e89094c44da98b954eedeac495271d0f">DAI</option>
                <option value="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">USDC</option>
              </select>
            </div>

            <div>
              <button className="btn btn-sm mt-3 bg-black text-white" onClick={clearSellToken}>
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-2 mb-2 text-white">
          <input
            type="number"
            placeholder="0.0"
            className="input input-bordered input-secondary w-full max-w-xs"
            onChange={(e) => setInputOne(e.target.value)}
            value={inputOne}
          />
        </div>
      </div>

      <div className="card-body">
        <div className="container">
          <div className="card-title text-xs ml-[8px] text-green-400">Buy</div>
          <div className="flex justify-between">
            <div className="dropdown dropdown-left dropdown-end">
              <select
                className="select w-full max-w-xs text-white"
                onChange={(e) => setBuyToken(e.target.value)}
                value={buyToken}
              >
                <option disabled value="">
                  Pick your Token
                </option>
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">ETH</option>
                <option value="0x6b175474e89094c44da98b954eedeac495271d0f">DAI</option>
                <option value="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">USDC</option>
              </select>
            </div>

            <div>
              <button className="btn btn-sm mt-3 bg-black text-white" onClick={clearBuyToken}>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-2 mb-2 text-blue-600">
          <div className="input input-bordered input-secondary w-full max-w-xs">
            {price ? `Price: ${price}` : "Fetching price..."}
          </div>
        </div>

        <div className="card-actions">
          <button className="btn btn-active ml-[90px] rounded-lg text-white">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
