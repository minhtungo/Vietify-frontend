import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SORT_OPTIONS from 'static/sort-options';
import { FilterOption } from 'types/global';

interface SortByProps {}

const SortBy: React.FC<SortByProps> = ({}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query.sort
    ? SORT_OPTIONS.find((o) => o.value === query.sort)?.name
    : undefined;

  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentSelectedItem) {
      setSelectedItem(currentSelectedItem);
    }
  }, [currentSelectedItem]);

  const onSortBy = (option: FilterOption) => {
    setSelectedItem(option.name);
    const { sort, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          sort: option.value,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Select onValueChange={onSortBy}>
      <SelectTrigger className="w-[140px]">
        <SelectValue>{selectedItem || 'Sort'}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.name} value={option}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBy;
