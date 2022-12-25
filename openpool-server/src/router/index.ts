import express, {Request, Response, Router}  from "express";
import {addUser, requestAddrInfo, requestBalanceOf} from "../controller/index";
const router : Router = express.Router();

// routers
import NFTRouter from "./nft";
import userRouter from "./user"

router.use("/test", (req : Request, res : Response)=>{
    return res.status(200).send("Server Routing Test!");
});

router.post("/addUser", addUser);

router.use("/address", requestAddrInfo);

router.use("/balance", requestBalanceOf);

router.use("/nft", NFTRouter);

router.use("/user", userRouter);

export default router;