import express, {Request, Response ,Router} from "express";
const router : Router = express.Router();

//controller
import {userController} from "../controller/index";
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get("/datatosign", userController.createDataToSign);

router.post("/login", userController.login);
//여기바꿈
/* router.post("/logout", (req: Request, res: Response)=>{
})

router.post("/verify", (req: Request, res: Response)=>{
}) */
router.post("/logout", userController.logout);

router.post("/verify", userController.verify);

export default router;