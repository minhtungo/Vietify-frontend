import { searchProducts } from '@lib/data';
import Layout from '@modules/layout/templates';
import { useQuery } from '@tanstack/react-query';
import Heading from '@ui/heading';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { q: searchQuery } = router.query;

  const { data, isError, isLoading } = useQuery(
    [`search_products`, searchQuery],
    () => searchProducts(searchQuery as string)
  );

  return (
    <div className="content-container pt-6">
      <Heading className="pt-12 text-center">{searchQuery}</Heading>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Search;
