import React, { useEffect, useState } from "react";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { useNavigate } from "react-router-dom";

const DelegateVotingPower = () => {
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <p className="font-normal text-gray-400 text-center">
        Add Address and Delegate the Power to the Voters!
      </p>
      <div
        className="border rounded-lg p-3 max-w-4xl"
        style={{ borderColor: "#2d2d2d" }}
        id="delegate"
      >
        <div className="mx-auto max-w-2xl text 2xl text-gray-50 text-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row ">
              <label
                htmlFor="MATIC"
                className="block mt-5 mb-2 text-left max-w-2xl text-xl font-medium text-white"
              >
                To
              </label>
            </div>
            <input
              className=" border mx-auto max-w-2xl  text-white text-sm rounded-lg  block w-full p-2.5 bg-transparent border-gray-600  focus:ring-blue-500 focus:border-blue-500"
              min="0"
              style={{ borderColor: "#2d2d2d" }}
              value={address}
              onChange={handleChange}
            />
            <div>
              <button
                className="bg-transparent border w-full empty:3 px-12 py-4 rounded-full mt-10 ext font-normal text-white hover:bg-blue-600"
                style={{ borderColor: "#2d2d2d" }}
              >
                Delegate Power
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DelegateVotingPower;
