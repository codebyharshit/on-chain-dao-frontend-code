import React from "react";
import "./App.css";
import Home from "./pages/Home";
import CreateProposal from "./pages/CreateProposal";
import TreasuryPage from "./pages/TreasuryPage";
import DetailsPage from "./pages/DetailsPage";
import AboutPage from "./pages/AboutPage";
import { Route, Routes } from "react-router-dom";
import Delegate from "./pages/Delegate";

function App() {
  return (
    <React.StrictMode>
      <Routes>
      <Route exact path="/" element={<Home />} />  
      <Route path="/Create" element={<CreateProposal />} />  
      <Route path="/Treasury" element={<TreasuryPage />} />  
      <Route path="/About" element={<AboutPage />} />  
      <Route path="/Details/:id" element={<DetailsPage />} />  
      <Route path="/Delegate" element={<Delegate/>} />
      {/* <Route exact path="/create-nft" element={<CreateNFTPage />} />  
      <Route exact path="/create-vote" element={<CreateVotePage />} />   */}
      </Routes>
    </React.StrictMode>
  );
}

export default App;
