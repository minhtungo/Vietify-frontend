import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { book, bookDetails } from '@static/book';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@ui/table';
import { TabsContent } from '@ui/tabs';

interface AdditionalInfoTabProps {
  product: PricedProduct;
}

const ProductDetails = ({ product }: AdditionalInfoTabProps) => {
  return (
    <>
      <Table className="mx-auto w-full md:w-2/3">
        <TableBody>
          {bookDetails.map((book) => (
            <TableRow key={book.label}>
              <TableHead>{book.label}</TableHead>
              <TableCell>{book.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductDetails;
