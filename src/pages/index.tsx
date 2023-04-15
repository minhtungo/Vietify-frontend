import Head from '@modules/common/components/head';
import Deals from '@modules/home/components/deals';
import FeaturedBooks from '@modules/home/components/featured-books';
import Hero from '@modules/home/components/hero/templates';
import ProductsCategory from '@modules/home/components/products-category';
import Trending from '@modules/home/components/trending';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the ACME. Worldwide Shipping. Secure Payment."
      />
      <Hero />
      <Deals />
      <Trending />
      <FeaturedBooks />
      <ProductsCategory />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
