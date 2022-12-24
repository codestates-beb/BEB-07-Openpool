import { DataSource } from "typeorm";
import User from "../entity/User";
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "OPENPOOL",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [User],
})

if (!AppDataSource.isInitialized){
    AppDataSource.initialize()
    .then(()=>{
        console.log("db init success");
    })
    .catch((error)=> console.log(error));
}



export default AppDataSource