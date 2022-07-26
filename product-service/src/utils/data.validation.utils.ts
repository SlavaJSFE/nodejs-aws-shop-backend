export const validateNewProductData = (body: any) => {
  const { price, count } = body;

  const countInteger = parseFloat(count);

  return price > 0 && !Number.isNaN(countInteger) && Number.isInteger(countInteger) && countInteger >= 0
};
