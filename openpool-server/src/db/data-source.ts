import { DataSource } from "typeorm";
import User from "../entity/User";
import NFT from "../entity/NFT";
import NFT_ATTRIBUTE from "../entity/NFT_ATTRIBUTE";
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "OPENPOOL",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    entities: [User, NFT, NFT_ATTRIBUTE],
})

AppDataSource.initialize()
    .then(()=>{
        console.log("db init success");
        AppDataSource.synchronize();
    })
    .catch((error)=> console.log(error));


export default AppDataSource;