// modules
import express from "express";
import {Request, Response} from "express";
import morgan from 'morgan';
import router from "./router/index";

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Server Log
app.use(morgan("dev"));

// Linking Router
app.use("/router", router);

// Basic Express Use
app.get("", (req: Request, res:Response)=>{
    console.log("Hello TypeScripts");
    return res.status(200).send("Welcome");
})

// Server Running
app.listen(PORT, ()=>{
    console.log(`Listening ${PORT}!`);
})