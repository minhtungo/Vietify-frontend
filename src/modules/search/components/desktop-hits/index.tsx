import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from '@ui/popover';
import React, { useState, useEffect } from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks-web';

import { ProductHit } from '../hit';
import Link from 'next/link';

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
        className="hidden max-h-[400px] w-full overflow-y-auto p-1 md:min-w-[350px] lg:block 2xl:min-w-[500px]"
        onInteractOutside={() => setValue('')}
      >
        <ul className="flex flex-col gap-1">
          {hits.map((hit) => (
            <li
              className="list-none p-1.5 hover:bg-muted"
              key={hit.objectID}
              onClick={() => setValue('')}
            >
              <Hit hit={hit as unknown as ProductHit} />
            </li>
          ))}
        </ul>
        <PopoverClose
          className="w-full rounded-sm py-2 text-center text-sm hover:bg-accent"
          asChild
        >
          <Link href={`/search?q=${value}`}>Xem tất cả kết quả</Link>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default DesktopHits;
