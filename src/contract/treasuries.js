import { TREASURY_CONTRACT_ADDRESS, TREASURY_ABI } from "./constants";
import { ethers } from 'ethers';

let treasuries;

const connectTreasury = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    treasuries = new ethers.Contract(TREASURY_CONTRACT_ADDRESS, TREASURY_ABI, signer);
    return treasuries;
}

export default connectTreasury;
export { treasuries };