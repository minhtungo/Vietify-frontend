import { Menu, Transition } from '@headlessui/react';
import cn from '@lib/util/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@modules/common/components/dropdown-menu';
import Link from '@modules/common/components/link';
import ChevronDownIcon from '@modules/common/icons/chevron-down';
import { Fragment } from 'react';
import SORT_OPTIONS from 'static/sort-options';

interface sortByProps {}

const SortBy: React.FC<sortByProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Sort by
        <ChevronDownIcon
          className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-10 mt-2 w-40 rounded-md bg-white shadow-2xl focus:outline-none">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.name}>{option.name}</DropdownMenuItem>
        ))}
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
