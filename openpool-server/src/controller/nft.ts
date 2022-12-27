// modules
import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { ApplicationInsights } from "aws-sdk";
import web3 from "../config/web3";

// db
import AppDataSource from "../db/data-source";
import NFT from "../entity/NFT";


type Attribute = {
    trait_type : string,
    value : string | number,
}

interface Metadata {
    image : string,
    external_url : string,
    description : string,
    name : string,
    attributes : Array<Attribute|null>,
    background_color?: string,
    animation_url?: string,
    youtube_url?: string
}

function refinePath(path : string){
    path = path.replace("public", "");
    return path;
}

const getNFTs = async (req : Request, res : Response)=>{
    const NFTs = await AppDataSource.getRepository(NFT).find()
    .catch(error=>error);

    if (NFTs.length < 1) return res.status(202).send("등록된 NFT가 없습니다.");
    else return res.status(200).send(NFTs);    
}

const uploadImage = (req : Request, res : Response)=>{
    if (!req.file) return res.status(404).send("이미지가 포함되어있지 않습니다.");

    const file : Express.Multer.File = req.file;
    const filename : string = file.filename;
    const path = refinePath(file.path);

    return res.status(202).send({filename, path});
}

const createMetadata = (req : Request, res : Response)=>{
    if (!req.body.image || !req.body.external_url || !req.body.description || !req.body.name)
        return res.status(404).send("데이터가 부족합니다.");
    
    const _metadata : Metadata = {
        image : req.body.image,
        external_url : req.body.external_url,
        description : req.body.description,
        name : req.body.name,
        attributes : req.body.attributes || []
    };

    if (!_metadata) return res.status(404).send("잘못된 요청입니다.");

    if (req.body.background_color) _metadata.background_color = req.body.background_color;
    if (req.body.animation_url) _metadata.animation_url = req.body.animation_url;
    if (req.body.youtube_url) _metadata.youtube_url = req.body.youtube_url;

    const metadataJSON = JSON.stringify(_metadata);
    const filename = crypto.randomBytes(12).toString("base64url")+".json";

    fs.writeFileSync(
        path.join(__dirname + "/../../public/json", filename),
        metadataJSON,
    );

    return res.status(202).send({filename});
}



export default {
    getNFTs,
    uploadImage,
    createMetadata,
}