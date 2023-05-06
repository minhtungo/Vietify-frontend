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
      <NavigationMenuList>
        {HEADER_LIST.map((item) => (
          <NavigationMenuItem key={item.id} className="relative">
            <NavigationMenuTrigger className="relative">
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex min-w-[180px] flex-col gap-3">
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
