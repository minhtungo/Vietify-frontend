import { Product } from '@medusajs/medusa';
import { TabsContent } from '@ui/tabs';
import Text from '@ui/text';
import { book } from '@static/book';

interface AdditionalInfoTabProps {
  product: Product;
}

const ProductDetails = ({ product }: AdditionalInfoTabProps) => {
  return (
    <TabsContent value={book.details} className="text-medium-regular py-8">
      <table className="mx-auto w-2/3 table-auto text-left">
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
      </table>
    </TabsContent>
  );
};

export default ProductDetails;
