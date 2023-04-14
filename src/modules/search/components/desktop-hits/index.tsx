import React from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks-web';
import { ProductHit } from '../hit';
import cn from '@lib/util/cn';

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

const DesktopHits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { hits, results } = useHits(props);

  return (
    <div
      className={cn(
        'transition-[max-height,opacity] duration-300 ease-in-out overflow-y-auto px-4',
        className,
        {
          'max-h-[400px] opacity-100': !!hits.length,
          'max-h-0 opacity-0': !hits.length,
        }
      )}
    >
      {results?.query && (
        <div className="grid grid-cols-1">
          {hits.map((hit, index) => (
            <li key={index} className="list-none mt-1">
              <Hit hit={hit as unknown as ProductHit} />
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopHits;
