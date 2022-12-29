// modules
import {Request, Response} from "express";
import path from "path";
import {URL, Url} from "url";
import fs from "fs";
import crypto from "crypto";
import storage from "../config/s3Config"
require("dotenv").config();

// db
import AppDataSource from "../db/data-source";
import NFT from "../entity/NFT";

const BUCKET_NAME = process.env.BUCKET_NAME || ""

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
    const imageName = encodeURIComponent(file.filename);

    const param = {
        'Bucket' : BUCKET_NAME,
        'Key': imageName,
        'ACL': 'public-read',
        'Body': fs.createReadStream(file.path),
        'ContentType':'image/png'
    }
    
    storage.upload(param, function(err: any,data: any) {
        if(err) {
            console.log(err);
        }
        console.log('upload success');
    });

    const urlParam = {
        'Bucket' : BUCKET_NAME,
        'Key': imageName
    };
    storage.getSignedUrl('putObject', urlParam, function(err, url) {
        const urlParsed = new URL(url);
        const image_url = urlParsed.origin + urlParsed.pathname;
        return res.status(202).send({image_url});
    });
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
    
    const param = {
        'Bucket' : BUCKET_NAME,
        'Key': filename,
        'ACL': 'public-read',
        'Body': fs.createReadStream("public/json/"+filename),
        'ContentType':'application/json'
    }
    storage.upload(param, function(err: any,data: any) {
        if(err) {
            console.log(err);
        }
        console.log('upload success');
    });

    const urlParam = {
        'Bucket' : BUCKET_NAME,
        'Key': filename
    };
    storage.getSignedUrl('putObject', urlParam, function(err, url) {
        const pos1 = url.indexOf('.json');
        const token_url = url.substring(0,pos1+5);
        return res.status(202).send({token_url});
    });
    
}



export default {
    getNFTs,
    uploadImage,
    createMetadata,
}