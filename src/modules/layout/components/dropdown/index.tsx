'use client';

import Button from '@modules/common/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@modules/common/components/dropdown-menu';
import { BiCategoryAlt } from 'react-icons/bi';

const CATEGORY = [
  {
    id: 1,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '1',
    name: 'Friction',
    expanded: true,
  },
  {
    id: 2,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '2',
    name: 'Non-Fiction',
    expanded: false,
  },
  {
    id: 3,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '3',
    name: 'Mystery',
    expanded: false,
  },
  {
    id: 4,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '4',
    name: 'Fantasy',
    expanded: false,
    mdExpanded: true,
  },
  {
    id: 5,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '5',
    name: 'Romance',
    expanded: true,
  },
  {
    id: 6,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '6',
    name: 'Science Fiction',
    expanded: false,
  },
];

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <BiCategoryAlt className="text-gray-700" size={26} />
        </button>
        {/* <span>All categories</span> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {CATEGORY.map(({ id, name }) => (
          <DropdownMenuItem key={id}>{name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
