import { handler } from './getProductList';

describe('getProductList', () => {
  it('should return a list of products', async () => {
    const result = await handler();
    
    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body).length).toEqual(10);
  });
});
