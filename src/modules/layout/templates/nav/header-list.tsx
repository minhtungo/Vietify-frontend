import ListItem from '@modules/common/components/list-item';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@ui/navigation-menu';

import { useCollections } from 'medusa-react';

import { HEADER_LIST } from 'static/header';

const HeaderList = () => {
  const { collections } = useCollections();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-8">
        {HEADER_LIST.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex min-w-[150px] flex-col">
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
