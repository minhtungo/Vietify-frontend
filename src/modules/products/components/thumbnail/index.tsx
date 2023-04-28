import PlaceholderImage from '@icons/placeholder-image';
import cn from '@lib/util/cn';
import { Image as MedusaImage } from '@medusajs/medusa';
import AspectRatio from '@ui/aspect-ratio';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

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
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <div className={cn('relative', thumbnailVariants({ size }))}>
      <AspectRatio ratio={3 / 4}>
        <ImageOrPlaceholder
          image={initialImage}
          size={size}
          rounded={rounded}
        />
      </AspectRatio>
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
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
      <PlaceholderImage size={size === 'sm' ? 16 : 24} />
    </div>
  );
};

export default Thumbnail;
