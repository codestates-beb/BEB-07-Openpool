import {Request, Response} from "express";
import multer, {FileFilterCallback} from "multer";

export const multerConfig = {
    storage: multer.diskStorage({
        destination: 'uploads/',
    })
}