import express, {Request, Response, Router}  from "express";
const router : Router = express.Router();

// routers
import NFTRouter from "./nft";
import userRouter from "./user";
import contractRouter from "./contract";

router.use("/test", (req : Request, res : Response)=>{
    return res.status(200).send("Server Routing Test!");
});

router.use("/nft", NFTRouter);

router.use("/user", userRouter);

router.use("/contract", contractRouter);

export default router;