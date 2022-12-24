import express, {Request, Response, Router}  from "express";
import {addUser} from "../controller/index";
const router : Router = express.Router();

router.use("/test", (req : Request, res : Response)=>{
    return res.status(200).send("Server Routing Test!");
});

router.post("/addUser", addUser)

export default router;