import { DataSource } from "typeorm";
import User from "../entity/User";
import NFT from "../entity/NFT";
import NFT_Traits from "../entity/NFT_Traits";
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "openPool",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User, NFT, NFT_Traits],
})

AppDataSource.initialize()
    .then(()=>{
        console.log("db init success");
    })
    .catch((error)=> console.log(error));


export default AppDataSource;