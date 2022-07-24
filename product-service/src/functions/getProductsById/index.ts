import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/getProductById.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        request: {
          parameters: {
            paths: {
              id: true,
            }
          }
        },
        cors: true,
      },
    },
  ],
};
