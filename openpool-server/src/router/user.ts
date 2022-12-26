import express, {Request, Response ,Router} from "express";
const router : Router = express.Router();

//controller
import {userController} from "../controller/index";

router.get("/randomBytes", userController.createDummyData);

router.post("/login", userController.login);

router.post("/logout", (req: Request, res: Response)=>{

})

router.post("/verify", (req: Request, res: Response)=>{

})

export default router;