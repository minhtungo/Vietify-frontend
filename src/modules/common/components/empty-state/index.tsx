import { useRouter } from 'next/router';
import Button from '@ui/button';
import { headingVariants } from '@ui/heading';
import { FC } from 'react';
import { textVariants } from '@modules/ui/text';
import cn from '@lib/util/cn';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  subtitle,
  showButton,
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center gap-2 ',
        className
      )}
    >
      <div className={headingVariants({})}>{title}</div>

      {subtitle && (
        <p
          className={textVariants({
            size: 'sm',
          })}
        >
          {subtitle}
        </p>
      )}
      {showButton && (
        <Button size="sm" className="mt-2" onClick={() => router.push('/')}>
          Explore Books
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
