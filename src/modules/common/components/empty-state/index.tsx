import { useRouter } from 'next/router';
import Button from '@ui/button';
import Heading, { headingVariants } from '@ui/heading';
import { FC } from 'react';
import { textVariants } from '@modules/ui/text';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle, showButton }) => {
  const router = useRouter();

  return (
    <div className="content-container flex h-full flex-col items-center justify-center gap-4 py-24 sm:py-32">
      <div className="text-center">
        <div
          className={headingVariants({
            variant: 'heading',
          })}
        >
          {title}
        </div>

        {subtitle && (
          <p
            className={textVariants({
              variant: 'description',
              className: 'mt-2'
            })}
          >
            {subtitle}
          </p>
        )}
      </div>
      {showButton && (
        <Button onClick={() => router.push('/')}>Explore Books</Button>
      )}
    </div>
  );
};

export default EmptyState;
