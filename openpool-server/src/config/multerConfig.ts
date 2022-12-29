import {Request, Response} from "express";
import multer, {FileFilterCallback} from "multer";
import crypto from "crypto";

export default {
    storage: multer.diskStorage({
        destination: ("public/image/"),
        filename: (req: Request, file, cb)=>{
            cb(null, `${crypto.randomBytes(16).toString("base64url")}.${file.mimetype.split("/")[1]}`);
        }
    })
}