import express, {Request, Response} from "express";
const router = express.Router();

import {contractController} from "../controller/index";

router.post("/register", contractController.registerContract);

router.get("/test", contractController.test);

export default router;
