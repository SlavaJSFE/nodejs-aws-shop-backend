import { APIGatewayProxyEvent } from "aws-lambda";
import { validateNewProductData } from "../../utils/data.validation.utils";
import { HttpCode } from "../../utils/http.utils";
import { formatJSONResponse } from "../../libs/api-gateway";
import { getClient } from "../../utils/connection.utils";
import { createQueryInsertIntoProducts, createQueryInsertIntoStocks } from "./query";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(event);
  
  const body = JSON.parse(event.body);
  const isDataValid = validateNewProductData(body);

  if (!isDataValid) {
    return formatJSONResponse({
      message: `Received data is invalid`,
    }, HttpCode.BAD_REQUEST);
  }
  const client = getClient();
  client.connect();

  try {
    await client.query('BEGIN');

    const { rows: productRows } = await client.query(createQueryInsertIntoProducts(body));
    const product = productRows[0];
    const { rows: stocksRows } = await client.query(createQueryInsertIntoStocks(product.id, body.count));
    const stock = stocksRows[0];

    await client.query('COMMIT');
  
    return formatJSONResponse({...product, ...stock}, HttpCode.CREATED);
  } catch (error) {
    await client.query('ROLLBACK');
    return formatJSONResponse(error.message, error.statusCode || HttpCode.SERVER_ERROR);
  } finally {
    client.end();
  }
};
