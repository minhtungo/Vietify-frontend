import clsxm from '@lib/clsxm';
import Link from '@modules/common/components/link';
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
      className={clsxm(
        'w-full bg-no-repeat bg-cover bg-center flex items-center',
        'min-h-[420px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[550px]',
        className
      )}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1604361709763-44f7fc6dd075?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'`,
      }}
    >
      <div
        className={clsxm(
          'mx-auto flex flex-col h-full text-center px-6 max-w-[480px] md:max-w-[550px] xl:max-w-[750px] 2xl:max-w-[850px]'
        )}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-light xl:text-5xl 2xl:text-[55px]">
            {title}
          </h2>
          <p className="text-base md:text-[17px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16 text-brand-light 2xl:px-32">
            {description}
          </p>
          {banner.btnText && (
            <Link
              href={banner.btnUrl}
              className="h-[45px] mt-7 md:mt-8 text-sm inline-flex items-center justify-center transition duration-300 rounded px-6 py-2 font-semibold bg-brand-light text-brand-dark hover:text-brand-light hover:bg-brand"
            >
              {banner.btnText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
