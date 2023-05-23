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
const hostIP = process.env.REACT_APP_hostIP
console.log('hostIP == ',hostIP)
const provider = new ethers.WebSocketProvider("ws://"+hostIP+":9545")
// export const signer = new ethers.Wallet(privateKeyA, provider)
export const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider)

const contractAbi = contract.abi;
// const contractAddress = "0x64350fCdD19fd4a6a2A253c74d9563eB94A35ACE"; // local host
const contractAddress = process.env.REACT_APP_SmartContractFactory2Addr ;
export const policy = new ethers.Contract(contractAddress, contractAbi, signer);
export const policyInterface = new ethers.Interface(contractAbi);

const firebaseAbi = firebase.abi;
// const firebaseAddress = '0xbaC3568688c8EB01A145846C9F81c74360145a2B'; // local host
const firebaseAddress = process.env.REACT_APP_FirebaseSystemAddr ;
export const paymentStorage = new ethers.Contract(firebaseAddress, firebaseAbi, signer);

const mappingAbi = mapping.abi;
// const mappingAddress = '0xe00b75d0A8F24634bD979DD4edC9997B6e1Dc78e'; // local host
const mappingAddress = process.env.REACT_APP_MappingAddr ;
export const idMapper = new ethers.Contract(mappingAddress, mappingAbi, signer);