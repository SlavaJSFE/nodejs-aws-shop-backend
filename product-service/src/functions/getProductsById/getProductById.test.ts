import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./getProductById";

describe('getProductsById', () => {
  it('should return a list of products', async () => {
    const mockEvent = {
      pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' }
    } as unknown as APIGatewayProxyEvent;
    const { body } = await handler(mockEvent);
    
    expect(JSON.parse(body).title).toBe("Product 1");
  })
})
