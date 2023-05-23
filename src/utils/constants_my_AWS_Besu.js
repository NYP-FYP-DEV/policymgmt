import contract from './contracts/clientfactory2.sol/SmartContractFactory2.json';
import firebase from './contracts/firebase.sol/FirebaseSystem.json';
import mapping from './contracts/mapping.sol/Mapping.json';
import { ethers } from "ethers";

// import Web3 from 'web3';
// export const web3 = new Web3("ws://localhost:9545") /// Connect to private blockchain hosted locally

// const privateKeyA = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
// export const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);

// web3.eth.getBalance(accountA.address)
//     .then(x => {
//         console.log("Account A has balance of: ", web3.utils.fromWei(x))
//     })

    // export const signer = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" /// Use the first user as the signer

const provider = new ethers.WebSocketProvider("ws://13.212.7.104:9545")
// export const signer = new ethers.Wallet(privateKeyA, provider)
export const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider)

const contractAbi = contract.abi;
const contractAddress = "0x57B414B35A1081B6b18FB577539e9831Dc2225F9";
export const policy = new ethers.Contract(contractAddress, contractAbi, signer);
export const policyInterface = new ethers.Interface(contractAbi);

const firebaseAbi = firebase.abi;
const firebaseAddress = '0x57cfEFd9BeA1321982E70E9A25433690fF8417EB';
export const paymentStorage = new ethers.Contract(firebaseAddress, firebaseAbi, signer);

const mappingAbi = mapping.abi;
const mappingAddress = '0xA64459CDc9a3102745De7c86F99B69c36eA10199';
export const idMapper = new ethers.Contract(mappingAddress, mappingAbi, signer);