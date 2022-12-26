import {Request, Response} from "express";
import crypto from "crypto";

const createDummyData = (req : Request, res : Response)=>{
    const dummydata = crypto.randomBytes(16).toString("base64url");
    
    if (dummydata.length < 1 || !dummydata) return res.status(404).send("더미데이터를 생성하지 못 했습니다.");
    else return res.status(200).send(dummydata);
}

const signup = (req : Request, res : Response)=>{
    
}

const login = (req : Request, res : Response)=>{
    
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