import React, { useEffect, useState } from "react";
import { TREASURY_CONTRACT_ADDRESS, TREASURY_ABI } from "../contract/constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { useNavigate } from "react-router-dom";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const Treasury = () => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [ether, setEther] = useState(0);
  const navigate = useNavigate();

  const getBalance = async () => {
    const contract = new ethers.Contract(
      TREASURY_CONTRACT_ADDRESS,
      TREASURY_ABI,
      signer
    );

    const balance = await contract.getBalance();
    const parseBalance = await ethers.utils.formatEther(balance);
    setAccountBalance(parseBalance);
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleEther = async (e) => {
    setEther(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        to: TREASURY_CONTRACT_ADDRESS,
        value: ethers.utils.parseUnits(ether, 18),
      };

      const txn = await signer.sendTransaction(data);
      const Txn = await txn.wait();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div
        className="border rounded-lg p-3 max-w-4xl"
        style={{ borderColor: "#2d2d2d" }}
        id="treasury"
      >
        <div className="mx-auto  max-w-2xl  text-lg text-white">
          <h5>Treasury</h5>
        </div>
        <div
          className="mx-auto mt-2 block p-2 w-full m-3  max-w-2xl rounded-lg border shadow-md hover:bg-gray-400"
          style={{ borderColor: "#2d2d2d" }}
        >
          <div className="text-white font-medium ">
            <p>The Total balance in the treasury is {accountBalance} ether</p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text 2xl text-gray-50 text-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row ">
              <label
                htmlFor="MATIC"
                className="block mt-5 mb-2 text-left max-w-2xl text-xl font-medium text-white"
              >
                Ether
              </label>
            </div>
            <input
              className=" border mx-auto max-w-2xl  text-white text-sm rounded-lg  block w-full p-2.5 bg-transparent border-gray-600  focus:ring-blue-500 focus:border-blue-500"
              min="0"
              style={{ borderColor: "#2d2d2d" }}
              value={ether}
              onChange={handleEther}
            />
            <div>
              <button
                className="bg-transparent border w-full empty:3 px-12 py-4 rounded-full mt-10 ext font-normal text-white hover:bg-blue-600"
                style={{ borderColor: "#2d2d2d" }}
              >
                Deposit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Treasury;
