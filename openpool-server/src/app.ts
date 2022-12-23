import express  from "express";
import {Request, Response} from "express";
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.get("", (req: Request, res:Response)=>{
    console.log("Hello TypeScripts");
    return res.status(200).send("Welcome");
})


app.listen(PORT, ()=>{
    console.log(`Listening ${PORT}!`);
})