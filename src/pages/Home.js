import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.js";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar.js";
import Heading from "../components/Heading.js";
// import { govContract } from "../contract/ethers";
// import { treasuries } from "../contract/treasuries";
// import { TREASURY_CONTRACT_ADDRESS } from "../contract/constants";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
// import connectEther from "../contract/ethers";
// import connectTreasury from "../contract/treasuries";
import Web3 from "web3";
const web3 = new Web3();

const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
const contract = new ethers.Contract(
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
  provider
);
const filteredDataCopy = contract.filters.ProposalCreated();
console.log("filteredDataCopy", filteredDataCopy);

// import { NavLink } from "react-router-dom";
// import Loader from "../components/Loader.jsx";

// const gov = await connectEther();
//     const treasury = await connectTreasury();
//     console.log("treasury", treasury);
//     const getValueForTreasury = await treasury.interface.encodeFunctionData(
//       "sendEther",
//       [
//         values.toAdd.toString(),
//         ethers.utils.parseUnits(values.amount.toString(), 18),
//       ]
//     );

//     const proposal = await gov.propose(
//       [treasury.address],
//       [0],
//       [getValueForTreasury],
//       values.discussion
//     );

// const CardData = [
//   {
//     id: 1,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Active",
//     title: "Grants Commitee election for S4 and S5",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "7 days",
//   },
//   {
//     id: 2,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Closed",
//     title: "Grants Commitee election",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "17 days",
//   },
//   {
//     id: 3,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Active",
//     title: "Grants Commitee election for S4",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "8 days",
//   },
//   {
//     id: 4,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Closed",
//     title: "Grants Commitee election for S4 and S5",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "10 days",
//   },
//   {
//     id: 5,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Closed",
//     title: "Grants Commitee election for S5",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "7 days",
//   },
//   {
//     id: 6,
//     image: "https://mdbootstrap.com/img/new/standard/city/041.jpg",
//     createdBy: "0x1e4E468df44eEe85813E93820713c9dd44B4f4f5",
//     status: "Active",
//     title: "Grants Commitee election for S4 and S5",
//     description:
//       " Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
//     duration: "20 days",
//   },
// ];
const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const blockNumber = await provider.getBlockNumber();
        const items = await contract.queryFilter(
          filteredDataCopy,
          blockNumber - 950,
          blockNumber - 2
        );
        // const proposalId = items.map((item) =>
        //   web3.utils.hexToNumberString(item.args[0])
        // );
        // console.log(proposalId);
        // setEvents((prevItems) => [...prevItems, proposalId]);
        items.map((item) =>
          setEvents((prevItems) => [
            ...prevItems,
            web3.utils.hexToNumberString(item.args[0]),
          ])
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    init();
    // const getValueForTreasury = await treasury.interface.encodeFunctionData(
    //   "sendEther",
    //   [
    //     values.toAdd.toString(),
    //     ethers.utils.parseUnits(values.amount.toString(), 18),
    //   ]
    // );

    // contract.on(
    //   "ProposalCreated",
    //   (proposalId, proposer, startBlock, endBlock, description, event) => {
    //     let data = {
    //       proposalId: proposalId.toString(),
    //       proposer: proposer.toString(),
    //       startBlock: startBlock.toString(),
    //       endBlock,
    //       description,
    //       event,
    //     };
    //     console.log(data);
    //     setEventLogs((oldState) => [...oldState, data])
    //   }
    // );

    // contract.events
    //   .ProposalCreated()
    //   .on("data", (event) => {
    //     console.log(event);
    //     setEvents((events) => [
    //       ...events,
    //       { proposalId: event.proposalId.toString() },
    //     ]);
    //   })
    //   .on("error", (error) => {
    //     console.log(error);
    //   });

    // contract.ProposalCreated().watch((error, result) => {
    //   if (error) console.log("Error in myEvent event handler: " + error);
    //   else console.log("ProposalCreated: " + JSON.stringify(result.args));
    // });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center">
        <div>
          <Sidebar />
        </div>
        <div
          className="flex flex-col overflow-y-auto px-5"
          style={{ maxHeight: "92vh" }}
        >
          <Heading />

          {/* {events.length > 0 && events.map((event, idx) => ( */}
          {events.length > 0 &&
            events.map((event, idx) => (
              <Card key={idx} data={event.toString()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
