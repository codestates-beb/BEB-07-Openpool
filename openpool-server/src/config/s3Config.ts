import AWS from "aws-sdk";
require("dotenv").config();

const storage : AWS.S3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    region:"ddd",
})