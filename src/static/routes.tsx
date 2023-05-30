import MapPin from '@modules/common/icons/map-pin';
import Package from '@modules/common/icons/package';
import User from '@modules/common/icons/user';

export const ROUTES = {
  HOME: '/',
  CHECKOUT: '/checkout',
  CONTACT: '/contact-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FAQ: '/faq',
  FORGET_PASSWORD: '/forget-password',
  CHANGE_PASSWORD: '/account/change-password',
  ACCOUNT: '/account',
  ORDERS: '/account/orders',
  HELP_CENTER: '/account/help-center',
  LOGIN: '/account/login',
  SIGN_UP: '/account/signup',
  SEARCH: '/search',
  PRODUCTS: '/products',
  CATEGORY: '/category',
  WISHLIST: '/account/wishlist',
};

export const accountNavItems = [
  {
    title: 'Khái quát',
    href: '/account',
    icon: <User size={18} />,
  },
  {
    title: 'Thông tin tài khoản',
    href: '/account/profile',
    icon: <User size={18} />,
  },
  {
    title: 'Sổ địa chỉ',
    href: '/account/addresses',
    icon: <MapPin size={18} />,
  },
  {
    title: 'Quản lý đơn hàng',
    href: '/account/orders',
    icon: <Package size={18} />,
  },
];
