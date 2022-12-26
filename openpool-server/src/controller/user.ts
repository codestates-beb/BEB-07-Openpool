import {Request, Response} from "express";
import crypto from "crypto";
import web3 from "../config/web3";

const createDataToSign = (req : Request, res : Response)=>{
    const dataToSign = crypto.randomBytes(16).toString("base64url");
    
    if (dataToSign.length < 1 || !dataToSign) return res.status(404).send("더미데이터를 생성하지 못 했습니다.");
    else return res.status(200).send(dataToSign);
}

const signup = (req : Request, res : Response)=>{

}

const login = async (req : Request, res : Response)=>{
    const {dataToSign, signature, address} = req.body;
    const addressVerified = web3.eth.accounts.recover(dataToSign, signature)

    if (addressVerified !== address){
        return res.status(404).send("login failed");
    } else {
        // TODO jwt 발급

        return res.status(202).send("login Success");
    }
}

const logout = (req : Request, res : Response)=>{

}

const verify = (req : Request, res : Response)=>{

}

export default {
    createDataToSign,
    signup,
    login,
    logout,
    verify
}