import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { getProductListQuery } from './query';
import { HttpCode } from '../../utils/http.utils';
import { getClient } from '../../utils/connection.utils';

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(event);
  
  const client = getClient();
  await client.connect();

  try {
    const { rows } = await client.query(getProductListQuery);

    return formatJSONResponse(rows);
  } catch (error) {
    return formatJSONResponse(error.message, error.statusCode || HttpCode.SERVER_ERROR)
  } finally {
    client.end();
  }
};
