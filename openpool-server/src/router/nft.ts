import express, {Request, Response} from "express";
import multer from "multer";
const router = express.Router();

// configs
import multerConfig from "../config/multerConfig";
const upload = multer(multerConfig);

// controller
import {NFTController} from "../controller/index";

router.get("/nfts", NFTController.getNFTs);

router.post("/image", upload.single("image"), NFTController.uploadImage);

router.post("/metadata", NFTController.createMetadata);

router.post("/", NFTController.after_minting_request_insert);

router.get("/", NFTController.my_NFT);

router.get("/:contract/:tokenId", NFTController.one_NFT);

export default router;