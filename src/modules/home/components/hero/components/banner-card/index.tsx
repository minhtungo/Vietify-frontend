import cn from '@lib/util/cn';
import Button from '@ui/button';
import Link from '@common/link';
import { FC } from 'react';
import { Banner } from 'types/global';

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
          <h2 className="font-manrope text-3xl font-extrabold text-secondary-foreground md:text-4xl xl:text-5xl 2xl:text-[55px]">
            {title}
          </h2>
          <p className="text-base leading-7 text-brand-light md:text-[17px] md:leading-8 xl:px-16 xl:text-lg xl:leading-[1.92em] 2xl:px-32">
            {description}
          </p>
          {banner.btnText && (
            <Link href={banner.btnUrl}>
              <Button variant="secondary" className="mt-7 md:mt-8">
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
