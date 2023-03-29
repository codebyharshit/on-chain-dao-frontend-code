import React from "react";
import { Navbar } from "../components/Navbar";
import SideTabs from "../components/SideTabs";
import Vote from "../components/Vote";
import Details from "../components/Details";

const DetailsPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <Details />
          <Vote />
        </div>
        <div>
          <SideTabs />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
