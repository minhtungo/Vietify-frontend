import { medusaClient } from '../config';

export const getCategoryHandles = async (): Promise<string[]> => {
  const data = await medusaClient.productCategories
    .list({ limit: 100 })
    .then(({ product_categories }) => {
      return product_categories.map(({ handle }) => handle);
    });

  return data;
};
