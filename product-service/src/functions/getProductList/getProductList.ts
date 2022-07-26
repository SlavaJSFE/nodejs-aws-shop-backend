import { Client } from 'pg';
import 'dotenv/config';
import { formatJSONResponse } from '../../libs/api-gateway';
import { getProductListQuery } from './query';
import { HttpCode } from '../../utils/http.utils';

const dbOptions = {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

export const handler = async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows } = await client.query(getProductListQuery);

    return formatJSONResponse(rows);
  } catch (error) {
    return formatJSONResponse(error.message, error.statusCode || HttpCode.SERVER_ERROR)
  } finally {
    client.end();
  }
};
