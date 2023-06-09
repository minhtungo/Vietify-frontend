import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type CollectionData = {
  id: string;
  title: string;
};

export type FilterOption = {
  name: string;
  value: string;
};

export type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
};

export type Banner = {
  id: number;
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
  image: {
    mobile: {
      url: string;
    };
    desktop: {
      url: string;
    };
  };
};

export type StoreNavData = {
  collections: CollectionData[];
  hasMoreCollections: boolean;
  featuredProducts: PricedProduct[];
};

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
  page: {
    data: T;
  };
};

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData;
  };
};

export type PrefetchedPageProps = {
  notFound: boolean;
};

// For pages with nested layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>;
};

export type ProductPreviewType = {
  id: string;
  title: string;
  handle: string | null;
  thumbnail: string | null;
  createdAt: Date | undefined;
  price?: {
    calculated_price: string;
    original_price: string;
    difference: string;
    price_type: 'default' | 'sale';
  };
};

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[];
    count: number;
  };
};

export type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

export type CounterProps = {
  value: number;
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

export interface Book {
  description: string;
  details: string;
  publisher: string;
  publishDate: string;
  size: string;
  cover: string;
  numberOfPages: string;
  author: string;
  sku: string;
  review: string;
  relatedBooks: string;
  addToCart: string;
  outOfStock: string;
  trending: string;
  category: string;
  popular: string;
  deals: string;
}
