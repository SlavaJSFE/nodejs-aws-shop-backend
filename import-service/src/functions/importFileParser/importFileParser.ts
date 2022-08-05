import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client, streamToString } from '@libs/s3Utils';
import { S3Event } from 'aws-lambda';

const bucket = process.env.BUCKET;

export const handler = async (event: S3Event) => {
  console.log(bucket);
  
  const record = event.Records[0];
  const s3Client = getS3Client();
  const params = {
    Bucket: bucket,
    Key: record.s3.object.key,
  }

  const s3Stream = await s3Client.send(new GetObjectCommand(params));
  const bodyContents = await streamToString(s3Stream.Body);
  console.log(bodyContents);
  return bodyContents;
};
