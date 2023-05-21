import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { book, bookDetails } from '@static/book';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@ui/table';
import { TabsContent } from '@ui/tabs';

interface AdditionalInfoTabProps {
  product: PricedProduct;
}

const ProductDetails = ({ product }: AdditionalInfoTabProps) => {
  return (
    <TabsContent value={book.details} className="text-medium-regular">
      <Table className="mx-auto w-2/3">
        <TableBody>
          {bookDetails.map((book) => (
            <TableRow key={book.label}>
              <TableHead>{book.label}</TableHead>
              <TableCell>{book.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};

export default ProductDetails;
