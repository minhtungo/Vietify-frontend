import useGetProducts from '@lib/hooks/use-get-products';
import { createUrl } from '@lib/util/create-url';
import { SortFilterItem, defaultSort } from '@static/sort-options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface sortingListProps {
  list: SortFilterItem[];
}

const SortingList: React.FC<sortingListProps> = ({ list }) => {
  const router = useRouter();
  const { sort } = router.query;

  // const [selectedOption, setSelectedOption] = useState<string | undefined>(
  //   sort ? list.find((item) => item.slug === sort)?.title : 'Sort by'
  // );

  const {
    sortKey,
    title: initialOption,
    reverse,
  } = list.find((item) => item.slug === sort) || defaultSort;

  return (
    <Select>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder={initialOption} />
      </SelectTrigger>
      <SelectContent>
        {list.map((item) => (
          <SelectItem key={`${item.slug}`} value={item.title} asChild>
            <FilterItem item={item} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FilterItem = ({ item }: { item: SortFilterItem }) => {
  const router = useRouter();
  const { pathname } = router;

  const href =
    item.slug && item.slug.length
      ? createUrl(pathname, new URLSearchParams({ sort: item.slug }))
      : pathname;

  return (
    <Link prefetch={false} href={href}>
      {item.title}
    </Link>
  );
};

export default SortingList;
