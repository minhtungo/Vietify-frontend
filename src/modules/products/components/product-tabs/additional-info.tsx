import { Product } from '@medusajs/medusa';
import { TabsContent } from '@ui/tabs';
import Text from '@ui/text';

interface AdditionalInfoTabProps {
  product: Product;
}

const AdditionalInfoTab = ({ product }: AdditionalInfoTabProps) => {
  return (
    <TabsContent value="Additional Info" className="text-medium-regular py-8">
      <div className="grid grid-cols-2 gap-x-8 border-b pb-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <Text variant="label">Material</Text>
            <p>{product.material ? product.material : '-'}</p>
          </div>
          <div>
            <Text variant="label">Country of origin</Text>
            <p>{product.origin_country ? product.origin_country : '-'}</p>
          </div>
          <div>
            <Text variant="label">Type</Text>
            <p>{product.type ? product.type.value : '-'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <Text variant="label">Weight</Text>
            <p>{product.weight ? `${product.weight} g` : '-'}</p>
          </div>
          <div>
            <Text variant="label">Dimensions</Text>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : '-'}
            </p>
          </div>
        </div>
      </div>
      {product.tags.length ? (
        <div>
          <span className="font-semibold">Tags</span>
        </div>
      ) : null}
    </TabsContent>
  );
};

export default AdditionalInfoTab;
