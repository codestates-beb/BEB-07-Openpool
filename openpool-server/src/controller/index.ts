import AppDataSource from "../db/data-source";
import {Request, Response} from "express";
import User from "../entity/User";

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