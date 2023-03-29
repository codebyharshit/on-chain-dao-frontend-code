import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () => {
  return (
    <div>
      <nav>
        <div>
          <NavLink to="/">
            <div className="image-container">
            <img
              src="https://media.licdn.com/dms/image/C510BAQGbJciAIl3Mhg/company-logo_200_200/0/1525862345784?e=2147483647&v=beta&t=VGPJhJ__Di_sqqgohcUgSATNweOg0eLTIrQoBtUyyxc"
              alt="SoluLab Logo"
              />
            </div>
              </NavLink>
            <span>
              OnChainDAO
            </span>
          <div>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </div>
  );
};