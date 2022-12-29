import AWS from "aws-sdk";
require("dotenv").config();

const storage : AWS.S3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region:"ap-northeast-2",
});

export default storage;