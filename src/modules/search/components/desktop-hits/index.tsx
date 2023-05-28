import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from '@ui/popover';
import React, { useState, useEffect } from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks-web';

import { ProductHit } from '../hit';

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
    value: string;
    setValue: any;
  };

const DesktopHits = ({
  hitComponent: Hit,
  className,
  value,
  setValue,
  ...props
}: HitsProps<ProductHit>) => {
  const { hits } = useHits(props);
  const [hitsLength, setHitsLength] = useState(0);

  useEffect(() => {
    setHitsLength(hits.length);
  }, [hits]);

  if (!hitsLength) {
    return null;
  }

  return (
    <Popover open={!!value && hitsLength > 0}>
      <PopoverAnchor />
      <PopoverContent
        className="hidden max-h-[400px] w-full overflow-y-auto p-1 md:min-w-[500px] lg:block 3xl:min-w-[600px]"
        asChild
        onInteractOutside={() => setValue('')}
      >
        <ul className="w-full">
          {hits.map((hit) => (
            <li
              className="list-none py-2 hover:bg-muted"
              key={hit.objectID}
              onClick={() => setValue('')}
            >
              <Hit hit={hit as unknown as ProductHit} />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default DesktopHits;
