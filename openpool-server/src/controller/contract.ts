import {Request, Response} from "express";
import web3 from "../config/web3";

// db
import AppDataSource from "../db/data-source";
import Contract from "../entity/Contract";

const CreatureABI = require("../contract/CreatureABI.json");
const CreatureBytesCode = require("../contract/CreatureBytes.json");

const provider = process.env.PROVIDER_URI || "";

const contract = new web3.eth.Contract(CreatureABI);

//NFT method Selector
const getNameSelector = web3.eth.abi.encodeFunctionSignature("name()");
const getTokenURISelector = web3.eth.abi.encodeFunctionSignature("tokenURI(uint256)");


async function getTokenURI(address : string, tokenId : number){
    const tokenIdEncoded = web3.eth.abi.encodeParameter("uint256" , tokenId);
    const dataEncoded = getTokenURISelector+tokenIdEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getName(address : string){
    const dataEncoded = getNameSelector;
    console.log(dataEncoded);

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

const registerContract = async (req : Request, res : Response)=>{
    if(!req.body.address) return res.status(400).send("잘못된 입력입니다.")
    
    const address = req.body.address;

    const checkAddressData = await web3.eth.getCode(address);
    if(checkAddressData === "0x") return res.status(400).send("컨트랙트 주소가 아닙니다.");

    const name = await getName(address)

    console.log(name)
    return res.status(200).send("컨트랙트가 등록이 완료되었습니다.")
}

export default {
    registerContract,
}