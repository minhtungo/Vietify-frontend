import { useRouter } from 'next/router';
import SORT_OPTIONS from 'static/sort-options';
import { useEffect, useState } from 'react';
import { FilterOption } from 'types/global';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

interface SortByProps {}

const SortBy: React.FC<SortByProps> = ({}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query.sort_by
    ? SORT_OPTIONS.find((o) => o.value === query.sort_by)
    : undefined;

  const [selectedItem, setSelectedItem] = useState<FilterOption | undefined>(
    currentSelectedItem
  );

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

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
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Default sorting</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.name}
              value={option.name}
              onClick={() => onSortBy(option)}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
