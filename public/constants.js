import contract from './contracts/clientfactory2.sol/SmartContractFactory2.json';
import firebase from './contracts/firebase.sol/FirebaseSystem.json';
import mapping from './contracts/mapping.sol/Mapping.json';

import Web3 from 'web3';
export const web3 = new Web3("ws://127.0.0.1:9545") /// Connect to private blockchain hosted locally
export const signer = "06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480" /// Use the first user as the signer

const contractAbi = contract.abi;
const contractAddress = "0x7AC8F8AC1DC15f86361c069b917735CEaA82A7B8";
export const policy = new web3.eth.Contract(contractAbi, contractAddress);

const firebaseAbi = firebase.abi;
const firebaseAddress = '0xdc0006bf704eAE8509cD9C8196282D1f8FF4bA30';
export const paymentStorage = new web3.eth.Contract(firebaseAbi, firebaseAddress);

const mappingAbi = mapping.abi;
const mappingAddress = '0xd5AC690f2538AA2Bfdbd5F5F1d8F833CF9531bA2';
export const idMapper = new web3.eth.Contract(mappingAbi, mappingAddress);


// use of export const removes the need of examples like --> import {React} from 'react' (make the file contents eligible for importing)
