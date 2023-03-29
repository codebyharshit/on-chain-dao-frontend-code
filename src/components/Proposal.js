import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { govContract } from "../contract/ethers";
import { treasuries } from "../contract/treasuries";
import { TREASURY_CONTRACT_ADDRESS } from "../contract/constants";
import { ethers } from "ethers";
import connectEther from "../contract/ethers";
import connectTreasury from "../contract/treasuries";
import { ProposalState } from "../context/Context";

export const Proposal = () => {
  const {
    state: { values },
    dispatch,
  } = ProposalState();
  const { address, isConnected } = useAccount();
  const [navigateToNext, setNavigateToNext] = useState();
  const [eventLogs, setEventLogs] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    dispatch({
      type: "Add_Proposal",
      payload: {
        toAdd: values.toAdd.toString(),
        amount: values.amount.toString(),
        discussion: values.discussion.toString(),
      },
    });

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

    const proposal = await gov.propose(
      [treasury.address],
      [0],
      [getValueForTreasury],
      values.discussion
    );
    listenToEvent();
    console.log("proposal", proposal);
    const txn = await proposal.wait(1);
    const proposalId = txn.events[0].args.proposalId;
    console.log("proposalId", proposalId._hex);
  };

  const listenToEvent = async () => {
    const contract = await connectEther();
    console.log("contract", contract);

    contract.on(
      "ProposalCreated",
      (
        proposalId,
        proposer,
        targets,
        values,
        signatures,
        calldatas,
        startBlock,
        endBlock,
        description
      ) => {
        let data = {
          proposalId: proposalId.toString(),
          proposer: proposer.toString(),
          values: values.toString(),
          signatures: signatures.toString(),
          startBlock: startBlock.toString(),
          endBlock: endBlock.toString(),
          description: description.toString(),
          targets: targets.toString(),
          calldatas: calldatas.toString(),
        };
        console.log("data", data);
        setEventLogs((oldState) => [...oldState, data]);
      }
    );
  };

  return (
    <>
      <div>
        {eventLogs.reverse().map((event, index) => {
          return (
            <div key={index}>
              <div
                className="md:mx-auto mt-5 block p-6 m-2 max-w-4xl rounded-lg border shadow-md hover:bg-gray-100 sm:mx-5"
                style={{ borderColor: "#2d2d2d" }}
              >
                <p className="font-normal text-gray-400">
                  Proposal Id : {event.proposalId}
                </p>
                <p className="font-normal text-gray-400">
                  Proposer Address : {event.proposer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5">
        <Formik
          initialValues={{
            toAdd: "",
            amount: "",
            discussion: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="block mt-10 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
              >
                To
              </label>
              <input
                // type="text"
                id="toAdd"
                name="toAdd"
                onChange={handleChange}
                value={values.toAdd}
                aria-describedby="helper-text-explanation"
                className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Address of the user"
              />
              <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                {errors.title && touched.title && errors.title}
              </div>
              <label
                htmlFor="message"
                className=" mt-10 block  mb-2 text-sm font-medium text-gray-400 mx-auto max-w-2xl "
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                // rows="6"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                className="bg-transparent block p-2.5 w-full mx-auto max-w-2xl text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Amount"
              />
              <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                {errors.message && touched.message && errors.message}
              </div>
              <label
                htmlFor="discussion"
                className="block mt-10 mx-auto max-w-2xl text-sm font-normal text-gray-400 mb-2"
              >
                Discussion
              </label>
              <input
                type="text"
                id="discussion"
                name="discussion"
                value={values.discussion}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Enter Description"
              />
              {isConnected && (
                <div className="mx-auto block max-w-2xl mt-5">
                  <button
                    type="submit"
                    className="mt-5 px-4 py-2 rounded-lg border shadow-md hover:bg-gray-100 text-white hover:text-black"
                  >
                    Create a Proposal
                  </button>
                </div>
              )}
              {!isConnected && (
                <div className="block mt-10 mx-auto max-w-2xl text-sm font-normal">
                  <ConnectButton />
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
