import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@modules/common/components/navigation-menu';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import { BiCategoryAlt } from 'react-icons/bi';

import ListItem from './list-item';

const links: { title: string; href: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
  },
];

const Categories = ({}) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <BiCategoryAlt className="text-gray-700" size={26} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-3 min-w-[180px]">
                {links.map((component) => (
                  <ListItem key={component.title} href={component.href}>
                    {component.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Categories;
