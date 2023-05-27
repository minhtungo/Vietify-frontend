import Cart from '@modules/common/icons/cart';
import Heart from '@modules/common/icons/heart';
import Help from '@modules/common/icons/help';
import Order from '@modules/common/icons/order';
import User from '@modules/common/icons/user';

interface HeaderListProps {
  id: string;
  label: string;
  path: string;
  subMenu: {
    id: string;
    label: string;
    path: string;
  }[];
}

export const HEADER_LIST = [
  {
    id: 'featured',
    label: 'Featured',
    path: '/',
    subMenu: [
      {
        id: 'sale',
        label: 'Sale',
        path: '/sale',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact',
      },
    ],
  },
  {
    id: 'books',
    label: 'Books',
    path: '/',
    subMenu: [
      {
        id: 'sale',
        label: 'Sale',
        path: '/sale',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact',
      },
    ],
  },
  {
    id: 'manga',
    label: 'Manga',
    path: '/blog',
    subMenu: [
      {
        id: 'about',
        label: 'About',
        path: '/blog/about',
      },
    ],
  },
  {
    id: 'new-books',
    label: 'New Books',
    path: '/portfolio',
    subMenu: [
      {
        id: 'about',
        label: 'About',
        path: '/portfolio/about',
      },
    ],
  },
];

export const SITE_HEADER = [
  {
    id: 2,
    label: 'Favorites',
    path: '/account/favorites',
    icon: <Heart size={22} />,
  },
  {
    id: 3,
    label: 'Cart',
    path: '/account/cart',
    icon: <Cart size={22} />,
  },
  {
    id: 4,
    label: 'Orders',
    path: '/account/orders',
    icon: <Order size={22} />,
  },
  {
    id: 5,
    label: 'Help',
    path: '/help',
    icon: <Help size={22} />,
  },
];
