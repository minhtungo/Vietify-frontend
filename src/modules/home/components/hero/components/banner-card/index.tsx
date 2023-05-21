import cn from '@lib/util/cn';
import Button from '@ui/button';
import Link from '@common/link';
import { FC } from 'react';
import { Banner } from 'types/global';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';

interface BannerCardProps {
  className?: string;
  banner: Banner;
}

const BannerCard: FC<BannerCardProps> = ({ className, banner }) => {
  const { title, description, image } = banner;

  return (
    <div
      className={cn(
        'flex w-full items-center bg-cover bg-center bg-no-repeat',
        'min-h-[420px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[550px]',
        className
      )}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1604361709763-44f7fc6dd075?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'`,
      }}
    >
      <div
        className={cn(
          'mx-auto flex h-full max-w-[480px] flex-col px-6 text-center md:max-w-[550px] xl:max-w-[750px] 2xl:max-w-[850px]'
        )}
      >
        <div className="text-center">
          <Heading as="h2" variant="light" size="xl">
            {title}
          </Heading>
          <Text variant="light" size="lg" className="mt-2 xl:px-16 2xl:px-32">
            {description}
          </Text>
          {banner.btnText && (
            <Link href={banner.btnUrl}>
              <Button variant="secondary" className="mt-4 md:mt-5">
                {banner.btnText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
