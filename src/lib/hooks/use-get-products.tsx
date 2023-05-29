import { useCart, useProducts } from 'medusa-react';

interface useGetProductsProps {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}

const useGetProducts = ({
  query = '',
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}) => {
  const { cart } = useCart();
  let { products, isLoading } = useProducts({
    q: query,
    region_id: cart?.region_id,
  });
  if (!products) {
    return undefined;
  }
  sortKey === 'PRICE' &&
    products.sort(
      (a, b) =>
        a.variants[0].calculated_price! - b.variants[0].calculated_price!
    );

  sortKey === 'CREATED_AT' &&
    products.sort(
      (a, b) =>
        new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
    );

  reverse && products.reverse();

  return {
    products,
    isLoading,
  };
};

export default useGetProducts;
