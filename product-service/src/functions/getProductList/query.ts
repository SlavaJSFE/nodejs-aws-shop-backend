export const getProductListQuery = `
  SELECT id, title, description, price, count
  FROM products p
  INNER JOIN stocks s ON p.id = s.product_id
`;
