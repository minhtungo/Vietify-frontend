import Head from '@modules/common/components/head';
import FeaturedBooks from '@modules/home/components/featured-books';
import FeaturedProducts from '@modules/home/components/featured-products';
import Hero from '@modules/home/components/hero/templates';
import ProductsCategory from '@modules/home/components/products-category';
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
      <FeaturedBooks />
      <ProductsCategory />
      <FeaturedProducts />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
