import { GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI } from "./constants";
import { ethers } from 'ethers';

let govContract;

const connectEther =  () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    govContract = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_ABI, signer);
    return govContract;
}

export default connectEther;
export { govContract };