import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@modules/common/components/navigation-menu';
import ListItem from '@modules/layout/templates/nav/list-item';
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
                  <ListItem href={`/category/${c.handle}`}>{c.title}</ListItem>
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
