const SORT_OPTIONS = [
  { name: 'Most Popular', value: 'most-popular' },
  { name: 'Best Rating', value: 'best-rating' },
  { name: 'Newest', value: 'newest' },
  { name: 'Lowest Price', value: 'lowest' },
  { name: 'Highest Price', value: 'highest' },
];

export default SORT_OPTIONS;

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Bán chạy',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Mới nhất',
    slug: 'newest',
    sortKey: 'CREATED_AT',
    reverse: false,
  }, // asc
  {
    title: 'Giá thấp đến cao',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Giá cao đến thấp',
    slug: 'price-desc',
    sortKey: 'PRICE',
    reverse: true,
  },
];
