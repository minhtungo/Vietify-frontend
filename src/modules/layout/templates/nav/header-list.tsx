import ListItem from '@modules/common/components/list-item';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@ui/navigation-menu';

import { useProductCategories } from 'medusa-react';
import { ProductCategory } from '@medusajs/medusa';

import { HEADER_LIST } from 'static/header';

const HeaderList = () => {
  const { product_categories: categories } = useProductCategories();
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-8">
        {HEADER_LIST.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="min-w-[150px]">
                {item.subMenu.map((c) => (
                  <li key={c.id}>
                    <ListItem href={`/category/${item.path}`}>
                      {item.label}
                    </ListItem>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderList;
