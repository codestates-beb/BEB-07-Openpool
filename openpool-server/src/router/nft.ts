import express, {Request, Response} from "express";
import multer from "multer";
const router = express.Router();

// configs
import multerConfig from "../config/multerConfig";
const upload = multer(multerConfig);

// controller
import {NFTController} from "../controller/index";

router.post("/image", upload.single("image"), NFTController.uploadImage);

router.post("/metadata", NFTController.createMetadata);

export default router;