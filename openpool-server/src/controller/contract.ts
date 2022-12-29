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
const getBalanceOfSelector = web3.eth.abi.encodeFunctionSignature("owner(address)");
const getGetApprovedSelector = web3.eth.abi.encodeFunctionSignature("tokenId(uint256)");
const getIsApprovedForAllSelector = web3.eth.abi.encodeFunctionSignature("owner(address),operator(address)");
const getNameSelector = web3.eth.abi.encodeFunctionSignature("name()");
const getOwnerSelector = web3.eth.abi.encodeFunctionSignature("owner()");
const getOwnerOfSelector = web3.eth.abi.encodeFunctionSignature("tokenId(uint256)");
const getSupportInterfaceSelector = web3.eth.abi.encodeFunctionSignature("interfaceId(bytes4)");
const getSymbolSelector = web3.eth.abi.encodeFunctionSignature("symbol()");
const getTokenByIndexSelector = web3.eth.abi.encodeFunctionSignature("Index(uint256)");
const getTokenOfOwnerByIndexSelector = web3.eth.abi.encodeFunctionSignature("owner(address),index(uint256");
const getTokenURISelector = web3.eth.abi.encodeFunctionSignature("tokenId(uint256)");
const getTotalSupplySelector = web3.eth.abi.encodeFunctionSignature("totalSupply()");

async function getBalanceOf(address : string, owner : string) {
    const ownerEncoded = web3.eth.abi.encodeParameter("address" , owner);
    const dataEncoded = getBalanceOfSelector + ownerEncoded;
   
    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);

}

async function getApproved(address : string, tokenId : number) {
    const tokenIdEncoded = web3.eth.abi.encodeParameter("uint256" , tokenId);
    const dataEncoded = getGetApprovedSelector + tokenIdEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getIsApprovedForAll(address : string, owner : string, operator : string) {
    const ownerEncoded = web3.eth.abi.encodeParameter("address" , owner);
    const operatorEncoded = web3.eth.abi.encodeParameter("address" , operator);
    const dataEncoded = getIsApprovedForAllSelector + ownerEncoded + operatorEncoded;

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

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getOwner(address : string){
    const dataEncoded = getOwnerSelector;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getOwnerOf(address : string, tokenId : number){
    const tokenIdEncoded = web3.eth.abi.encodeParameter("uint256" , tokenId);
    const dataEncoded = getOwnerOfSelector + tokenIdEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getSupportInterface(address : string, interfaceId : string) {
    const interfaceIdEncoded = web3.eth.abi.encodeParameter("bytes4" , interfaceId);
    const dataEncoded = getSupportInterfaceSelector + interfaceIdEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getSymbol(address : string) {
    const dataEncoded = getSymbolSelector;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getTokenByIndex(address : string, index : number) {
    const indexEncoded = web3.eth.abi.encodeParameter("uint256" , index);
    const dataEncoded = getTokenByIndexSelector + indexEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getTokenOfOwnerByIndex(address : string, owner : string, index : number) {
    const ownerEncoded = web3.eth.abi.encodeParameter("address" , owner);
    const indexEncoded = web3.eth.abi.encodeParameter("uint256" , index);
    const dataEncoded = getTokenOfOwnerByIndexSelector + ownerEncoded + indexEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getTokenURI(address : string, tokenId : number){
    const tokenIdEncoded = web3.eth.abi.encodeParameter("uint256" , tokenId);
    const dataEncoded = getTokenURISelector + tokenIdEncoded;

    const result = await web3.eth.call({
        to: address,
        data: dataEncoded
    })
    .then(res=>res)
    .catch(err=>err)

    if (!result) return false;

    return web3.utils.toUtf8(result);
}

async function getTotalSupply(address : string) {
    const dataEncoded = getTotalSupplySelector;

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