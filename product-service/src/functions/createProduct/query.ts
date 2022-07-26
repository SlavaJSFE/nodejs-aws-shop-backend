export const createQueryCreateProduct = (body: any) => {
  const { title, description, price } = body;

  return `
    insert into products (title, description, price) values
      (${title}, ${description}, ${price});
  `
};
