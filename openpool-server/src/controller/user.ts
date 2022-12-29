import {Request, Response} from "express";
import crypto from "crypto";
import web3 from "../config/web3";

import AppDataSource from "../db/data-source";
import User from "../entity/User";

const jwt = require('jsonwebtoken');

async function signup (address : string){
  const createdAt = new Date().toISOString();
  return await AppDataSource.createQueryBuilder()
  .insert()
  .into(User)
  .values({
    address,
    name: "unname",
    createdAt,
  }).execute()
  .then(result=>result)
  .catch(console.log);
}

async function isUser(address : string){
  const result = await AppDataSource.createQueryBuilder()
  .select()
  .from(User, "User")
  .where("User.address = :address", {address})
  .getOne();

  console.log(result);

  if (!result) return false;
  else return true;
}

const createDataToSign = (req : Request, res : Response)=>{
    const dataToSign = crypto.randomBytes(16).toString("base64url");
    if (dataToSign.length < 1 || !dataToSign) return res.status(404).send("더미데이터를 생성하지 못 했습니다.");
    else return res.status(200).send(dataToSign);
}

const login = async (req : Request, res : Response)=> {
    const {dataToSign, signature, address} = req.body;
    const addressVerified = web3.eth.accounts.recover(dataToSign, signature).toLowerCase()
    
    if (addressVerified !== address){
        return res.status(404).send("login failed");
    } else {
      if (! await isUser(address)) await signup(address);

      let accessToken = jwt.sign({address}, process.env.ACCESS_SECRET, {expiresIn:'1m'});
      let refreshToken = jwt.sign({address}, process.env.REFRESH_SECRET, {expiresIn:'1d'});
      res.cookie('refreshToken',refreshToken, {httpOnly:true,});
      return res.json({data:{accessToken}, message:"ok"});
    }
}

const logout = (req : Request, res : Response)=>{
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken) {
    return res.status(400).send({message: "refresh token not provided"});
  }
  return res.status(200).clearCookie("refreshToken").send({message:"success remove"});
}

const verify = (req : Request, res : Response)=>{
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).send({ data: null, message: "refresh token not provided" });
  }

  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    delete data.iat;
    delete data.exp;
    const accessToken = jwt.sign(data, process.env.ACCESS_SECRET, {expiresIn: "1m"});
    return res.status(200).send({ data: {accessToken, data}, message: "ok" });
  } 
  catch (err) {
    return res.status(400).send({data: null, message: "invalid refresh token, please log in again",});
  }
};

export default {
    createDataToSign,
    signup,
    login,
    logout,
    verify
}