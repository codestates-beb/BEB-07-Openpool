import {Request, Response} from "express";
import crypto from "crypto";
import web3 from "../config/web3";

const createDummyData = (req : Request, res : Response)=>{
    const dummydata = crypto.randomBytes(16).toString("base64url");
    
    if (dummydata.length < 1 || !dummydata) return res.status(404).send("더미데이터를 생성하지 못 했습니다.");
    else return res.status(200).send(dummydata);
}

const signup = (req : Request, res : Response)=>{

}

const login = async (req : Request, res : Response)=>{
    const {dummydata, signature, address} = req.body;
    const addressVerified = web3.eth.accounts.recover(dummydata, signature)

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
    createDummyData,
    signup,
    login,
    logout,
    verify
}