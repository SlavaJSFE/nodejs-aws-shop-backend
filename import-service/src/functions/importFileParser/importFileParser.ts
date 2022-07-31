// import { S3Event } from 'aws-lambda';

import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = (event: APIGatewayProxyEvent) => {
  console.log(event);
  
};
