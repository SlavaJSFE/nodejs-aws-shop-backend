import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./getProductById";

describe('getProductById', () => {
  it('should return a list of products', async () => {
    const mockEvent = {
      pathParameters: { productId: '8c224866-d454-4a6f-9771-9916a01bd84c' }
    } as unknown as APIGatewayProxyEvent;
    const { body } = await handler(mockEvent);
    
    expect(JSON.parse(body).title).toBe("Product 1");
  })
})
