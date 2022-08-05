import { S3Client } from "@aws-sdk/client-s3";
import { Stream } from "stream";

export const getS3Client = () => {
  return new S3Client({ region: process.env.REGION })
};

export const streamToString = async (stream: Stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};
