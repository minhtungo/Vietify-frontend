import ListItem from '@modules/common/components/list-item';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@ui/navigation-menu';

import { useCollections } from 'medusa-react';
import { BiCategoryAlt } from 'react-icons/bi';

const Categories = ({}) => {
  const { collections } = useCollections();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BiCategoryAlt className="text-gray-700" size={26} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex min-w-[180px] flex-col gap-3">
              {collections?.map((c) => (
                <li key={c.id}>
                  <NavigationMenuLink asChild>
                    <ListItem href={`/category/${c.handle}`}>
                      {c.title}
                    </ListItem>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Categories;
