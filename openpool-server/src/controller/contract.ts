const Web3 = require("web3");
require("dotenv").config();

const CreatureABI = require("../contract/CreatureABI.json");
const CreatureBytesCode = require("../contract/CreatureBytes.json");

const provider = process.env.PROVIDER_URI || "";

// 주의할 것
const web3  = new Web3(provider);

const contract = new web3.eth.Contract(CreatureABI);



