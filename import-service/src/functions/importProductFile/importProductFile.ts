import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpCode } from '@libs/httpCode';
import { s3Client } from '@libs/s3Utils';
import { APIGatewayProxyEvent } from 'aws-lambda';

const bucket = process.env.BUCKET;

export const handler = async (event: APIGatewayProxyEvent) => {
  const fileName = event.queryStringParameters?.name;

  if (!fileName) {
    return formatJSONResponse({
      message: `Missing query parameter "name"`,
    }, HttpCode.BAD_REQUEST);
  }
  
  const prefix = 'uploaded/';
  const params = {
    Bucket: bucket,
    Key: `${prefix}${fileName}`,
  };

  try {
    const command = new PutObjectCommand(params);
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return formatJSONResponse({ presignedUrl });
  } catch (error) {
    return formatJSONResponse({
      message: `Received data is invalid`,
    }, HttpCode.SERVER_ERROR);
  }
};
