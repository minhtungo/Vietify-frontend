import MinusIcon from '@icons/minus';
import PlusIcon from '@icons/plus';
import { ProductCollection, StoreGetProductsParams } from '@medusajs/medusa';
import PriceSelector from '@modules/common/components/price-selector';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import { Separator } from '@ui/separator';
import { useCollections } from 'medusa-react';
import { Dispatch, FC, SetStateAction, ChangeEvent } from 'react';

interface FilterProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleCollectionChange: (
    e: ChangeEvent<HTMLInputElement>,
    collection: ProductCollection
  ) => void;
  refinementList: StoreGetProductsParams;
}

const Filter: FC<FilterProps> = ({
  isOpen,
  setIsOpen,
  handleCollectionChange,
  refinementList,
}) => {
  const { collections, isLoading } = useCollections();

  return (
    <form className="hidden lg:block">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CollapsibleTrigger asChild>
          <div className="flex w-full cursor-pointer items-center justify-between text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Genres</span>

            {isOpen ? (
              <MinusIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <ul className="flex flex-col gap-y-2">
            {collections?.map((c) => (
              <li key={c.id} className="flex items-center space-x-2">
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.collection_id?.includes(
                      c.id
                    )}
                    onChange={(e) => handleCollectionChange(e, c)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">{c.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-4" />
      <PriceSelector defaultValue={[0, 100]} />
    </form>
  );
};

export default Filter;
