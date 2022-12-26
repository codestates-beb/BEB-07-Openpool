//modules
import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { ApplicationInsights } from "aws-sdk";

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

const uploadImage = (req : Request, res : Response)=>{
    if (!req.file) return res.status(404).send("이미지가 포함되어있지 않습니다.");

    const file : Express.Multer.File = req.file;
    const filename : string = file.filename;
    const path = refinePath(file.path);

    return res.status(202).send({filename, path});
}

const createMetadata = (req : Request, res : Response)=>{
    const _metadata : Metadata = {...req.body};

    if (!_metadata) return res.status(404).send("잘못된 요청입니다.");

    const metadataJSON = JSON.stringify(_metadata);
    const filename = crypto.randomBytes(12).toString("base64url")+".json";

    fs.writeFileSync(
        path.join(__dirname + "/../../public/json", filename),
        metadataJSON,
    );

    return res.status(202).send({filename});
}



export default {
    uploadImage,
    createMetadata,
}