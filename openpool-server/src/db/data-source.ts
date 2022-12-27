import { DataSource } from "typeorm";
import User from "../entity/User";
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "openPool",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    entities: [User],
})

AppDataSource.initialize()
    .then(()=>{
        console.log(AppDataSource.getMetadata(User));
        console.log("db init success");
        AppDataSource.synchronize();
    })
    .catch((error)=> console.log(error));


export default AppDataSource;