import { APIGatewayProxyEvent } from "aws-lambda";
import { validateNewProductData } from "../../utils/data.validation.utils";
import { HttpCode } from "../../utils/http.utils";
import { formatJSONResponse } from "../../libs/api-gateway";
import { getClient } from "../../utils/connection.utils";
import { createQueryCreateProduct } from "./query";

export const handler = async (event: APIGatewayProxyEvent) => {
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
    const { rows } = await client.query(createQueryCreateProduct(body));

    return formatJSONResponse(rows);
  } catch (error) {
    return formatJSONResponse(error.message, error.statusCode || HttpCode.SERVER_ERROR);
  } finally {
    client.end();
  }
};
