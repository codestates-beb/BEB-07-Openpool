import express, {Request, Response} from "express";
const router = express.Router();

import {contractController} from "../controller/index";

router.post("/register", contractController.registerContract);

export default router;
