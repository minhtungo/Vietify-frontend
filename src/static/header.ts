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

const HEADER_LIST = [
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

export { HEADER_LIST };
