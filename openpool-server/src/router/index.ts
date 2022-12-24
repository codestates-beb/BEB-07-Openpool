import express, {Request, Response, Router}  from "express";
const router : Router = express.Router();

router.use("/", (req : Request, res : Response)=>{
    return res.status(200).send("Server Routing Test!");
});

export default router;





