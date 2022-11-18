import AWS from 'aws-sdk';
import {React} from "react";

export const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;


AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
})

export const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})