import { Disclosure } from '@headlessui/react';
import MinusIcon from '@modules/common/icons/minus';
import PlusIcon from '@modules/common/icons/plus';
import { ChangeEvent } from 'react';
import { Fragment, useState } from 'react';

interface categoryFilterProps {}

const CategoryFilter: React.FC<categoryFilterProps> = ({}) => {
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Genres</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <ul className="flex gap-x-4 flex-col gap-y-2">
              {collections?.map((c) => (
                <li key={c.id} className="">
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CategoryFilter;
