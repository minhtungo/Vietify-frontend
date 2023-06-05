import cn from '@lib/util/cn';
import { FC } from 'react';

interface containerProps {
  className?: string;
  children: React.ReactNode;
  main?: boolean;
}

const Container: FC<containerProps> = ({
  className,
  children,
  main = false,
}) => {
  if (main) {
    return (
      <main
        className={cn(
          'container mx-auto my-12 w-full max-w-7xl px-6 xl:px-4',
          className
        )}
      >
        {children}
      </main>
    );
  }
  return (
    <div
      className={cn(
        'container mx-auto my-12 w-full max-w-7xl px-6 xl:px-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
