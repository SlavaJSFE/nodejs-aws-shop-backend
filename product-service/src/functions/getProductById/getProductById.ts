import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { HttpCode } from '../../utils/http.utils';
import { getClient } from '../../utils/connection.utils';
import { createQueryGetProductById } from './query';
import { uuidValidateV4 } from 'src/utils/uuid.utils';

export const handler = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;

  if (!uuidValidateV4(productId)) {
    return formatJSONResponse({
      message: `Requested product ID is not valid`,
    }, HttpCode.BAD_REQUEST);
  }

  const client = getClient();
  await client.connect();
    
  try {
    const { rows } = await client.query(createQueryGetProductById(productId));
    
    if (!rows.length) {
      return formatJSONResponse({
        message: `Product with id ${productId} was not found`,
      }, HttpCode.NOT_FOUND);
    }

    return formatJSONResponse(rows[0]);
  } catch (error) {
    return formatJSONResponse(error.message, error.statusCode || HttpCode.SERVER_ERROR);
  } finally {
    client.end();
  }
};
