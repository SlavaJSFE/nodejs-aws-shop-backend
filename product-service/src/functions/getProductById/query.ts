export const createQueryGetProductById = (id: string) => {
  return `
  SELECT id, title, description, price, count
  FROM products p
  JOIN stocks s ON p.id = s.product_id
  AND p.id = '${id}';
  `
};
