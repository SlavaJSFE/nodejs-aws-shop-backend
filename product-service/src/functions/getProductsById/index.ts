import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/getProductsById.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
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
