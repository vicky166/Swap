"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useSendTransaction } from 'wagmi';
import { ethers } from "ethers";
import { Address } from "viem";
import { walletClient } from "@/utils/config";
import axios from "axios";

const Card = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputSec, setInputSec] = useState("");
  const [sellToken, setSellToken] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [price, setPrice] = useState("");
  const { isConnected, address } = useAccount();

  async function getPrice() {
    if (!isConnected) {
      console.log("Connect your account");
    } else if (sellToken && buyToken && inputOne) {
      const url = `https://api.0x.org/swap/v1/price?sellAmount=${inputOne}&
buyToken=${buyToken}&sellToken=
${sellToken}`
      try {
        const response = await axios.get(url, {
          headers: { "0x-api-key": "f8a0dc95-a1b2-424b-9f91-839ea88e3e43" },
        });
        console.log(response)
        setPrice(response.data.buyAmount);
      } catch (err) {
        console.log("get price", err);
      }
    }
  }


  async function swapTokens() {
    if (!isConnected) {
      console.log("Connect your account");
    } else if (sellToken && buyToken && inputOne && price) {
      const url = `https://api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${inputOne}`;
      try {
        const response = await axios.get(url, {
          headers: { "0x-api-key": "f8a0dc95-a1b2-424b-9f91-839ea88e3e43" },
        });
        const { to, data, value } = response.data;
        const amountInWei = ethers.parseUnits(inputOne, 'ether');
        const hash = await walletClient.sendTransaction({
          account: address as Address,
          to: to,
          value: amountInWei,
          data
        })
      } catch (err) {
        console.log("swaptoken", err);
      }
    }
  }


  useEffect(() => {
    getPrice()

  }, [sellToken, buyToken, inputOne])

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

  const handleSwap = () => {
    setSellToken((prevSellToken) => {
      const newSellToken = buyToken;
      setBuyToken(prevSellToken);
      return newSellToken;
    });

    setInputOne((prevInputOne) => {
      const newInputOne = inputSec;
      setInputSec(prevInputOne);
      return newInputOne;
    });
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg mx-auto shadow-xl mt-8 bg-black rounded-xl md:mt-20">
      <figure className="px-4 pt-4 md:px-10 md:pt-10">
        <div className="flex justify-start gap-2">
          <div className="badge bg-black text-white border-black">Market</div>
          <button className="badge bg-black text-white border-black">Limit</button>
          <button className="badge bg-black text-white border-black">Cross Chain</button>
        </div>
        <br />
      </figure>

      <div className="card-body">
        <div className="container">
          <div className="card-title text-xs text-red-600 md:text-sm">Sell</div>
          <div className="flex justify-between items-center">
            <div className="dropdown w-1/2">
              <select
                className="select w-full text-white bg-black border-gray-600"
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
              <button
                className="btn btn-sm bg-black text-white"
                onClick={clearSellToken}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-2 mb-2">
          <input
            type="number"
            min={0}
            placeholder="0.0"
            className="input input-bordered w-full text-white bg-black"
            onChange={(e) => setInputOne(e.target.value)}
            value={inputOne}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="swap">
          <input type="checkbox" onChange={handleSwap} />
          <div className="swap-on">Swap Up</div>
          <div className="swap-off">Swap Down</div>
        </label>
      </div>

      <div className="card-body">
        <div className="container">
          <div className="card-title text-xs text-green-400 md:text-sm">Buy</div>
          <div className="flex justify-between items-center">
            <div className="dropdown w-1/2">
              <select
                className="select w-full text-white bg-black border-gray-600"
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
              <button
                className="btn btn-sm bg-black text-white"
                onClick={clearBuyToken}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-2 mb-2">
          <div className="input input-bordered w-full text-white bg-black">
            {price ? `Price: ${price}` : "Fetching price..."}
          </div>
        </div>

        <div className="card-actions flex justify-center">
          <button className="btn btn-sm mt-3 mb-3" onClick={swapTokens}>
            SWAP Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
