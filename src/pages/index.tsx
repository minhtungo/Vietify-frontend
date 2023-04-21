import Head from '@modules/common/components/head';
import Deals from '@modules/home/components/deals';
import FeaturedBooks from '@modules/home/components/featured-books';
import FeatureGrid from '@modules/home/components/featured-grid';
import Hero from '@modules/home/components/hero/templates';
import ProductsCategory from '@modules/home/components/products-category';
import Trending from '@modules/home/components/trending';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

export const bundleData = [
  {
    id: 1,
    slug: 'spring-cleaning-for-home-appliance',
    image: '/hero.jpg',
    title: 'bundle-title-one',
    description: 'bundle-description',
    bgColor: '#FFEED6',
  },
  {
    id: 2,
    slug: 'your-pet-choice-for-fresh-healthy-food',
    image: '/assets/hero.jpg',
    title: 'bundle-title-two',
    description: 'bundle-description',
    bgColor: '#D9ECD2',
  },
  {
    id: 3,
    slug: 'washing-item-with-discount-product',
    image: '/assets/hero.jpg',
    title: 'bundle-title-three',
    description: 'bundle-description',
    bgColor: '#DBE5EF',
  },
  {
    id: 4,
    slug: 'fresh-quality-meat-item-with-discount',
    image: '/assets/hero.jpg',
    title: 'bundle-title-four',
    description: 'bundle-description',
    bgColor: '#EFD8D4',
  },
];

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
      <FeatureGrid className="my-3 md:my-4 content-container" />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
