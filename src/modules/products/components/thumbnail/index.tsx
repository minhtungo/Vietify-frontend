import cn from '@lib/util/cn';
import { Image as MedusaImage } from '@medusajs/medusa';
import PlaceholderImage from '@modules/common/icons/placeholder-image';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

const thumbnailVariants = cva('', {
  variants: {
    size: {
      sm: 'w-[180px]',
      md: 'w-[290px]',
      lg: 'w-[440px]',
      full: 'w-full',
    },
    rounded: {
      default: '',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-2xl',
    },
  },
  defaultVariants: {
    size: 'sm',
    rounded: 'default',
  },
});

export interface ThumbnailProps extends VariantProps<typeof thumbnailVariants> {
  thumbnail?: string | null;
  images?: MedusaImage[] | null;
  className?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size,
  rounded,
  className,
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <div className={cn('relative aspect-[5/7]', thumbnailVariants({ size }))}>
      <ImageOrPlaceholder image={initialImage} size={size} rounded={rounded} />
    </div>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
  rounded,
}: ThumbnailProps & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      fill
      className={cn(
        'absolute inset-0 object-cover object-center',
        thumbnailVariants({ rounded })
      )}
      draggable={false}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={size === 'sm' ? 16 : 24} />
    </div>
  );
};

export default Thumbnail;
