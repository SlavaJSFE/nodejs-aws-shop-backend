import { GetObjectCommand } from '@aws-sdk/client-s3';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpCode } from '@libs/httpCode';
import { processS3Stream, s3Client } from '@libs/s3Utils';
import { S3Event } from 'aws-lambda';

const bucket = process.env.BUCKET;

export const handler = async (event: S3Event) => {  
  const record = event.Records[0];
  const params = {
    Bucket: bucket,
    Key: record.s3.object.key,
  }

  try {
    const s3Stream = await s3Client.send(new GetObjectCommand(params));
    const result = await processS3Stream(s3Stream.Body);
    console.log(result);
  } catch (error) {
    return formatJSONResponse({
      message: `Received data is invalid`,
    }, HttpCode.SERVER_ERROR);
  }
};
