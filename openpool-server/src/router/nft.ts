import express, {Request, Response} from "express";
const router = express.Router();

// controller
import {NFTController} from "../controller/index";

router.post("/image", )

router.post("/metadata", NFTController.createMetadata);

export default router;