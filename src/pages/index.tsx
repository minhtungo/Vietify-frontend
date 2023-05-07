import Head from '@common/head';
import Deals from '@modules/home/components/deals';
import FeaturedBooks from '@modules/home/components/featured-books';
import FeatureGrid from '@modules/home/components/featured-grid';
import Hero from '@modules/home/components/hero/templates';
import Popular from '@modules/home/components/popular';
import ProductsCategory from '@modules/home/components/products-category';
import TheMonth from '@modules/home/components/the-month';
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
      {/* <BundleGrid data={bundleData} className="my-12 lg:my-14" /> */}
      <Deals />
      <ProductsCategory />
      <FeaturedBooks />
      <Trending />
      <Popular />
      <TheMonth />
      <FeatureGrid className="content-container my-3 md:my-4" />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
