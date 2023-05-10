import { Product } from '@medusajs/medusa';
import { TabsContent } from '@ui/tabs';
import Text from '@ui/text';
import { book } from '@static/book';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table';

interface AdditionalInfoTabProps {
  product: Product;
}

const bookDetail = [
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

const ProductDetails = ({ product }: AdditionalInfoTabProps) => {
  return (
    <TabsContent value={book.details} className="text-medium-regular py-8">
      <Table className="mx-auto w-2/3">
        <TableBody>
          {bookDetail.map((book) => (
            <TableRow key={book.label}>
              <TableHead className="">{book.label}</TableHead>
              <TableCell>{book.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <table className="mx-auto w-2/3 table-auto text-left">
        <tbody>
          <tr className="border-b border-gray-200">
            <th scope="row" className="bg-muted px-6 py-4 font-semibold">
              <Text variant="label">Weight</Text>
            </th>
            <td className="px-6 py-4">
              <Text variant="info">Silver</Text>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <th scope="row" className="bg-muted px-6 py-4 font-semibold">
              <Text variant="label">Weight</Text>
            </th>
            <td className="bg-muted/30 px-6 py-4">
              <Text variant="info" className="text-foreground">
                Silver
              </Text>
            </td>
          </tr>
          <tr>
            <th scope="row" className="bg-muted px-6 py-4 font-semibold">
              <Text variant="label">Weight</Text>
            </th>
            <td className="px-6 py-4">
              <Text variant="info">Silver</Text>
            </td>
          </tr>
        </tbody>
      </table> */}
    </TabsContent>
  );
};

export default ProductDetails;
