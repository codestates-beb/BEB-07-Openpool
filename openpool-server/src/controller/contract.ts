const Web3 = require("web3");

const CreatureABI = require("../contract/CreatureABI.json");
const CreatureBytesCode = require("../contract/CreatureBytes.json");

const provider = process.env.PROVIDER_URI || "";

// 주의할 것
const web3  = new Web3("https://goerli.infura.io/v3/e7d044e5975d4d17a27b1e66cda478cd");



const contract = new web3.eth.Contract(CreatureABI);



