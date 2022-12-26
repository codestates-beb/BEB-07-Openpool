import AppDataSource from "../db/data-source";
import {Request, Response} from "express";
import User from "../entity/User";
import web3 from "./web3";

import NFTController from "./nft";
import userController from "./user";

export const addUser = async (req : Request, res: Response)=>{
    const address : string = req.body.address;

    await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{
        address: address
    }]).execute();

    return res.status(200).send("success db");
}

export const requestAddrInfo = async (req : Request, res: Response)=>{
    const address : string = req.body.address;

    const curBlockNumber : number = await web3.eth.getBlockNumber();
    const fromBlock : number = curBlockNumber - 1000;
    const toBlock : number = curBlockNumber;

    console.log(address);

    return await web3.eth.getPastLogs({
        fromBlock: 8098260,
        toBlock: 8098260,
        address
    }, (error : Error, logs)=>{
        if (error) console.log(error)
        else {
            console.log(logs)
            res.status(200).send(logs);
        };
    })
}

export const requestBalanceOf = async (req : Request, res : Response)=>{
    const address : string = req.body.address;

    console.log(address);
    return await web3.eth.getBalance(address)
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err);
    });
}

export {NFTController, userController}