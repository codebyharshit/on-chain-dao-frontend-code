import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import connectEther from "../contract/ethers";
import connectTreasury from "../contract/treasuries";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Details = () => {
  const [votingPeriod, setVotingPeriod] = useState(null);
  const [state, setState] = useState();
  const [propThreshold, setPropThreshold] = useState();
  const [blockNumber, setBlockNumber] = useState();
  const [quorum, setQuorum] = useState();
  const { id } = useParams();
  const contract = new ethers.Contract(
    GOVERNANCE_CONTRACT_ADDRESS,
    GOVERNANCE_ABI,
    provider.getSigner()
  );

  useEffect(() => {
    async function fetchVotingDetails() {
      const contract = new ethers.Contract(
        GOVERNANCE_CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        provider.getSigner()
      );
      const period = await contract.votingPeriod();
      const state = await contract.state(id);
      const proposalThreshold = await contract.proposalThreshold();
      const blockNumber = await provider.getBlockNumber();
      const quorum = await contract.quorum(blockNumber - 100);
      console.log(quorum);
      setBlockNumber(blockNumber);
      setVotingPeriod(period);
      setState(state);
      setQuorum(quorum.toString());
      setPropThreshold(proposalThreshold.toString());
    }
    fetchVotingDetails();
  }, [provider]);

  const values = {
    toAdd: "0xDF28C8cF657F679732F2ff5E2E39E970c44bab9c",
    amount: "0.1",
    discussion: "sendEther",
  };

  const handleQueue = async () => {
    const gov = await connectEther();
    const treasury = await connectTreasury();
    console.log("treasury", treasury);
    const getValueForTreasury = await treasury.interface.encodeFunctionData(
      "sendEther",
      [
        values.toAdd.toString(),
        ethers.utils.parseUnits(values.amount.toString(), 18),
      ]
    );
    console.log("getValueForTreasury", getValueForTreasury);

    const queue = await gov.queue(
      [treasury.address],
      [0],
      [getValueForTreasury],
      "0xc700fcf825bb96908bcfa40b8d91237381cd207a842fc67195330064c6f87772"
    );
  };

  const handleExecute = async () => {
    const gov = await connectEther();
    const treasury = await connectTreasury();
    console.log("treasury", treasury);
    const getValueForTreasury = await treasury.interface.encodeFunctionData(
      "sendEther",
      [
        values.toAdd.toString(),
        ethers.utils.parseUnits(values.amount.toString(), 18),
      ]
    );
    console.log("getValueForTreasury", getValueForTreasury);

    const execute = await gov.execute(
      [treasury.address],
      [0],
      [getValueForTreasury],
      "0xc700fcf825bb96908bcfa40b8d91237381cd207a842fc67195330064c6f87772"
    );
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <div className=" mt-5  text-3xl font-bold text-gray-50">
          <h1>First Proposal</h1>
        </div>

        {state === 4 ? (
          <div className="mt-5 flex flex-row">
            <button
              onClick={handleQueue}
              class="bg-green-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full"
            >
              Queue
            </button>
          </div>
        ) : (
          ""
        )}

        {state === 5 ? (
          <div className="mt-5 flex flex-row">
            <button
              onClick={handleExecute}
              class="bg-green-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full"
            >
              Execute
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="mt-5 flex flex-row">
          <button class="bg-green-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full">
            Active
          </button>
          <img
            src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
            class=" h-6 w-6 ml-2 rounded-full"
            alt=""
          />
          <p className=" font-medium text-gray-400 ml-2">
            Address of the user!
          </p>
          {votingPeriod !== null && (
            <p className=" font-medium text-xl text-gray-400 mt-5">
              Voting period: {votingPeriod.toString()}
            </p>
          )}
          <p className=" font-medium text-xl text-gray-400 mt-5">
            Quorum Requirement: {quorum}
          </p>
          {propThreshold !== null && (
            <p className=" font-medium text-xl text-gray-400 mt-5">
              Proposal Threshold: {propThreshold}
            </p>
          )}
          <p className=" font-medium text-xl text-gray-400 mt-5">
            Proposal ID: {id}
          </p>
        </div>
        <div className=" mt-5  text-3xl font-bold text-gray-50">
          <h1>Members Votes</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
