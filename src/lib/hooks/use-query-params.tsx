import { StoreGetProductsParams } from '@medusajs/medusa';
import { useCart } from 'medusa-react';
import { useMemo } from 'react';

const useQueryParams = (params: StoreGetProductsParams) => {
  const { cart } = useCart();

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {};

    if (cart?.id) {
      p.cart_id = cart.id;
    }

    p.is_giftcard = false;

    return {
      ...p,
      ...params,
    };
  }, [cart?.id, params]);

  return queryParams;
};

export default useQueryParams;
