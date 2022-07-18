import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { productList } from '../../data/productList';

export const handler = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  const product = productList.find((item) => item.id === productId);

  if (product) {
    return formatJSONResponse._200(product);
  }
  
  return formatJSONResponse._404({
    message: `Product with id ${productId} was not found`,
  })
};
