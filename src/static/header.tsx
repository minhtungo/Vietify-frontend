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
    id: 'home',
    label: 'Home',
    path: '/',
    subMenu: [
      {
        id: 'about',
        label: 'About',
        path: '/about',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact',
      },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
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
    id: 'portfolio',
    label: 'Portfolio',
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
    id: 1,
    label: 'My Account',
    path: '/account',
    icon: <User size={22} />,
  },
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
