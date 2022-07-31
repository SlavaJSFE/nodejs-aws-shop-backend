import { S3Client } from "@aws-sdk/client-s3";
import 'dotenv/config';

export const getS3Client = () => {
  return new S3Client({ region: process.env.REGION })
};
