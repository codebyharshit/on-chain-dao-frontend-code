// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   GOVERNANCE_CONTRACT_ADDRESS,
//   GOVERNANCE_ABI,
// } from "../contract/constants";
// import { ethers } from "ethers";

// const provider = new ethers.providers.Web3Provider(window.ethereum);

// const Card = (props) => {
//   const [votingPeriod, setVotingPeriod] = useState(null);
//   const [state, setState] = useState();
//   const { data } = props;

//   useEffect(() => {
//     async function fetchVotingPeriod() {
//       const contract = new ethers.Contract(
//         GOVERNANCE_CONTRACT_ADDRESS,
//         GOVERNANCE_ABI,
//         provider.getSigner()
//       );
//       const period = await contract.votingPeriod();
//       const state = await contract.state(data);
//       setVotingPeriod(period);
//       setState(state);
//     }
//     fetchVotingPeriod();
//   }, [provider]);

//   return (
//     <div>
//       <NavLink
//         to={`/${
//           state === 1 || state === 4 || state === 5 ? `Details/${data}` : ""
//         }`}
//       >
//         <div
//           className="block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-700"
//           style={{ borderColor: "#2d2d2d" }}
//         >
//           <div className="mb-3 flex flex-row justify-between">
//             <div className="flex flex-row">
//               <p className=" font-medium text-gray-400 ml-2">
//                 ProposalId :{" "}
//                 {`${data.substring(0, 6)}....${data.substring(
//                   data.length - 4,
//                   data.length
//                 )}`}
//               </p>
//             </div>
//             <div>
//               {votingPeriod !== null && (
//                 <p className=" font-medium text-gray-400 ml-8 mr-5">
//                   Voting period: {votingPeriod.toString()}
//                 </p>
//               )}
//             </div>
//             <button
//               className={`${
//                 state === 1 || state === 4 || state === 5
//                   ? "bg-green-500"
//                   : "bg-violet-600"
//               } text-white font-bold  px-3 rounded-full h-fit`}
//             >
//               {state === 1 || state === 4 || state === 5
//                 ? "Active"
//                 : "Not Active"}
//             </button>
//           </div>
//         </div>
//       </NavLink>
//     </div>
//   );
// };

// export default Card;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  GOVERNANCE_CONTRACT_ADDRESS,
  GOVERNANCE_ABI,
} from "../contract/constants";
import { ethers } from "ethers";
const { BigNumber } = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Card = (props) => {
  const [votingPeriod, setVotingPeriod] = useState(null);
  const [state, setState] = useState();
  const { data } = props;
  useEffect(() => {
    console.log("data", data);
    async function fetchVotingPeriod() {
      const contract = new ethers.Contract(
        GOVERNANCE_CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        provider.getSigner()
      );
      console.log(contract);
      const period = await contract.votingPeriod();
      console.log("period", period.toString());
      const state = await contract.state(data);
      console.log("state", state.toString());
      setVotingPeriod(period.toString());
      setState(state.toString());
    }
    fetchVotingPeriod();
  }, [provider]);

  return (
    <div>
      <NavLink
        to={`/${
          state === "1" || state === "4" || state === "5"
            ? `Details/${data}`
            : ""
        }`}
      >
        <div
          className="block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-700"
          style={{ borderColor: "#2d2d2d" }}
        >
          <div className="mb-3 flex flex-row justify-between">
            <div className="flex flex-row">
              <p className=" font-medium text-gray-400 ml-2">
                ProposalId :{" "}
                {`${data.substring(0, 6)}....${data.substring(
                  data.length - 4,
                  data.length
                )}`}
              </p>
            </div>
            <div>
              {votingPeriod !== null && (
                <p className=" font-medium text-gray-400 ml-8 mr-5">
                  Voting period: {votingPeriod.toString()}
                </p>
              )}
            </div>
            <button
              className={`${
                state === "1" || state === "4" || state === "5"
                  ? "bg-green-500"
                  : "bg-violet-600"
              } text-white font-bold  px-3 rounded-full h-fit`}
            >
              {state === "1" || state === "4" || state === "5"
                ? "Active"
                : "Not Active"}
            </button>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
