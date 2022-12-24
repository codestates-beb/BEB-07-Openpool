// modules
import express from "express";
import {Request, Response} from "express";
import morgan from 'morgan';
import router from "./router/index";
import cors from "cors";

// configs
import corsConfig from "./config/corsConfig";

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(cors(corsConfig));

// body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Server Log
app.use(morgan("dev"));

// Linking Router
app.use("", router);

// Basic Express Use
app.get("/test", (req: Request, res:Response)=>{
    console.log("Hello TypeScripts");
    return res.status(200).send("Welcome");
})

// Server Running
app.listen(PORT, ()=>{
    console.log(`Listening ${PORT}!`);
})