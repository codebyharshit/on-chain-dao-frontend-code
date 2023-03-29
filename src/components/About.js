import React, { useState, useEffect } from "react";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";


const provider = new ethers.providers.Web3Provider(window.ethereum);

const About = () => {
  const [VotingPeriod, setVotingPeriod] = useState(null);
  const [Token, setToken] = useState(null);
  const [Quorum, setQuorum] = useState(0);
  const [eventLogs, setEventLogs] = useState([]);
  const getContractDetails = async () => {
    const contract = new ethers.Contract(
      GOVERNANCE_CONTRACT_ADDRESS,
      GOVERNANCE_ABI,
      provider.getSigner()
    );

    const votePeriod = await contract.votingPeriod();
    setVotingPeriod(votePeriod);

    const tokenAddress = await contract.token();
    setToken(tokenAddress);

    const quorumPer = await contract.quorumNumerator();
    setQuorum(quorumPer);
  };

  useEffect(() => {
    getContractDetails();
  }, []);

  return (
    <div>
      <div className="mx-auto mt-5 max-w-xl text-xl text-gray-50">
        <h1>About</h1>
      </div>
      <div
        className="mx-auto mt-2 block p-6 m-2 max-w-xl rounded-lg border shadow-md "
        style={{ borderColor: "#2d2d2d", width: "600px" }}
      >
        <h1 className=" text-gray-50 text-lg font-semibold">
          Voting Period In Block
        </h1>
        <p className="font-normal text-gray-400">
          {VotingPeriod !== null && VotingPeriod.toString()}
        </p>

        <h1 className=" text-gray-50 text-lg font-semibold mt-4">Vote Token</h1>
        <p className="font-normal text-gray-400 ">
          {Token !== null && Token.toString()}
        </p>

        <h1 className=" text-gray-50 text-lg font-semibold mt-4">
          Quorum Percentage
        </h1>
        <p className="font-normal text-gray-400 ">{4}</p>
      </div>
    </div>
  );
};

export default About;
