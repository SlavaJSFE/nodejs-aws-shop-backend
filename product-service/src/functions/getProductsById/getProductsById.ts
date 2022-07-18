import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productsList } from 'src/data/productsList';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;
  const product = productsList.find((item) => item.id === id);

  if (product) {
    return formatJSONResponse(product);
  }
  
  return formatJSONErrorResponse({
    message: `Product with id ${id} was not found`,
  })
};

export const main = middyfy(getProductsById);
