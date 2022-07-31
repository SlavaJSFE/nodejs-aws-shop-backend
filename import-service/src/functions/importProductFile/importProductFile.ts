import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpCode } from '@libs/httpCode';
import { getS3Client } from '@libs/s3Client';
import { APIGatewayProxyEvent } from 'aws-lambda';
import 'dotenv/config';

const bucket = process.env.BUCKET;
const region = process.env.REGION

export const handler = async (event: APIGatewayProxyEvent) => {
  const fileName = event.queryStringParameters?.name;

  if (!fileName) {
    return formatJSONResponse({
      message: `Missing query parameter "name"`,
    }, HttpCode.BAD_REQUEST);
  }
  
  const s3Client = getS3Client();
  const prefix = 'uploaded/';
  const params = {
    Bucket: bucket,
    Prefix: prefix,
  };

  try {
    const { Contents } = await s3Client.send(new ListObjectsCommand(params));
    const file = Contents.find((content) => content.Key === `${prefix}${fileName}`);
    
    if (!file) {
      return formatJSONResponse({
        message: `File with name ${fileName} was not found`,
      }, HttpCode.BAD_REQUEST);
    }

    return formatJSONResponse({ data: `https://${bucket}.s3.${region}.amazonaws.com/${file.Key}` });
  } catch (error) {
    return formatJSONResponse({
      message: `Received data is invalid`,
    }, HttpCode.SERVER_ERROR);
  }
};
