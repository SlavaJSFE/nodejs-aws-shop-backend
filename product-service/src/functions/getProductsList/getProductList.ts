import { formatJSONResponse } from '../../libs/api-gateway';
import productList from '../../data/productList.json';

export const handler = async () => {
  return formatJSONResponse._200(productList);
};
