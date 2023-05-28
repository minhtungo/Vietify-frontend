import { medusaClient } from '@lib/config';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Layout from '@modules/layout/templates';
import { ProductHit } from '@modules/search/components/hit';
import { useQuery } from '@tanstack/react-query';
import Heading from '@ui/heading';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';
import { useProduct } from 'medusa-react';
import { searchProducts } from '@lib/data';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { q: searchQuery } = router.query;

  const { data, isError, isLoading } = useQuery(
    [`search_products`, searchQuery],
    () => searchProducts(searchQuery as string)
  );

  return (
    <div className="content-container pt-6">
      <Heading className="pt-12 text-center">{q}</Heading>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Search;
