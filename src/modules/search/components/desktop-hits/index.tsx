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
  };

const DesktopHits = ({
  hitComponent: Hit,
  className,
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
    <Popover defaultOpen={true}>
      <PopoverAnchor />
      <PopoverContent
        className="max-h-[400px] w-full max-w-[500px] overflow-y-auto"
        // onInteractOutside={() => setHitsLength(0)}
      >
        <ul>
          {hits.map((hit, index) => (
            <li key={index} className="list-none py-2 hover:bg-muted">
              <PopoverClose asChild>
                <Hit hit={hit as unknown as ProductHit} />
              </PopoverClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default DesktopHits;
