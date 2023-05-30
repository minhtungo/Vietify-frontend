import { createUrl } from '@lib/util/create-url';
import { SortFilterItem, defaultSort } from '@static/sort-options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { useRouter } from 'next/router';

interface sortingListProps {
  list: SortFilterItem[];
}

const SortingList: React.FC<sortingListProps> = ({ list }) => {
  const router = useRouter();
  const {
    query: { sort },
    pathname,
  } = router;

  const { slug: slugQuery } =
    list.find((item) => item.slug === sort) || defaultSort;

  return (
    <Select
      onValueChange={(itemSlug) =>
        router.push(
          itemSlug && itemSlug.length
            ? createUrl(pathname, new URLSearchParams({ sort: itemSlug }))
            : pathname
        )
      }
      value={slugQuery || ''}
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {list.map((item) => {
          return (
            <SelectItem key={`${item.slug}`} value={item.slug || ''}>
              {item.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SortingList;
