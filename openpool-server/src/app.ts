import express from "express";
import {Request, Response} from "express";
import morgan from 'morgan';

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));

app.get("", (req: Request, res:Response)=>{
    console.log("Hello TypeScripts");
    return res.status(200).send("Welcome");
})


app.listen(PORT, ()=>{
    console.log(`Listening ${PORT}!`);
})