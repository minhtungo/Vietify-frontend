import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@ui/navigation-menu';
import ListItem from '@modules/layout/templates/nav/list-item';
import { useCollections } from 'medusa-react';

import { HEADER_LIST } from 'static/header';

const HeaderList = ({}) => {
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
                  <ListItem href={`/category/${item.path}`} key={c.id}>
                    {item.label}
                  </ListItem>
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
