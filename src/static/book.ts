import { Book } from 'types/global';
import productData from '@static/locales/vi/products.json';

const book: Book = productData;

const bookDetails = [
  {
    label: book.cover,
    value: 'Paid',
  },
  {
    label: book.category,
    value: 'Pending',
  },
  {
    label: book.numberOfPages,
    value: 'Pending',
  },
  {
    label: book.publishDate,
    value: 'Pending',
  },
  {
    label: book.publisher,
    value: 'Pending',
  },
];

export { book, bookDetails };
