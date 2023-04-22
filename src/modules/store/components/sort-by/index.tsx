import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@modules/common/components/dropdown-menu';
import ChevronDownIcon from '@modules/common/icons/chevron-down';
import { useRouter } from 'next/router';
import SORT_OPTIONS from 'static/sort-options';
import { useState } from 'react';
import { FilterOption } from 'types/global';

interface sortByProps {}

const SortBy: React.FC<sortByProps> = ({}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query.sort_by
    ? SORT_OPTIONS.find((o) => o.value === query.sort_by)
    : undefined;

  const [selectedItem, setSelectedItem] = useState<FilterOption | undefined>(
    currentSelectedItem
  );

  const onSortBy = (option: FilterOption) => {
    setSelectedItem(option);
    const { sort_by, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          sort_by: option.value,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Sort by
        {selectedItem && <span> {`: ${selectedItem.name}`}</span>}
        <ChevronDownIcon
          className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-40">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.name} onClick={() => onSortBy(option)}>
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
