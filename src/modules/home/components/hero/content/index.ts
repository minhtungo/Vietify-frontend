import { Banner } from 'types/global';

export const banners: Banner[] = [
  {
    id: 1,
    title: 'Discover your next favorite book',
    description:
      'Browse our wide selection of books and find your next adventure today!',
    btnText: 'Explore More',
    btnUrl: '/search',
    image: {
      mobile: {
        url: '/hero.jpg',
      },
      desktop: {
        url: '/hero.jpg',
      },
    },
  },
  {
    id: 2,
    title: 'New Arrivals',
    description:
      'Check out our latest collection of books, featuring new releases and bestsellers.',
    btnText: 'Shop Now',
    btnUrl: '/new-arrivals',
    image: {
      mobile: {
        url: '/hero.jpg',
      },
      desktop: {
        url: '/hero.jpg',
      },
    },
  },
  {
    id: 3,
    title: 'Get Lost in a Good Book',
    description:
      'Find the perfect book to curl up with on a rainy day or to take on your next adventure.',
    btnText: 'Explore More',
    btnUrl: '/search',
    image: {
      mobile: {
        url: '/hero.jpg',
      },
      desktop: {
        url: '/hero.jpg',
      },
    },
  },
];
