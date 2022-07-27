export const createQueryInsertIntoProducts = (body: any) => {
  const { title, description, price } = body;

  return `
    insert into products (title, description, price) values
      ('${title}', '${description}', ${price})
    RETURNING *;
  `;
};

export const createQueryInsertIntoStocks = (id: string, count: string) => {
  return `
    insert into stocks (product_id, count) values
      ('${id}', ${count})
    RETURNING count;
  `;
}
