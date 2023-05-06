import CategoryIcon from '@icons/category';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@ui/heading';
import Text from '@ui/text';
import { useCollections } from 'medusa-react';
import Image from 'next/image';
import { CATEGORY_BREAKPOINTS } from 'static/breakpoints';
import { CATEGORIES } from 'static/categories';

export default function ProductsCategory() {
  const { collections, isLoading } = useCollections();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center gap-2">
        <CategoryIcon size={32} className="text-primary" />
        <Heading variant="heading">Categories</Heading>
      </div>
      <Carousel
        breakpoints={CATEGORY_BREAKPOINTS}
        prevActivateId="prev-category-carousel-button"
        nextActivateId="next-category-carousel-button"
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {CATEGORIES.map(({ id, imgSrc, altImg, name }) => (
          <SwiperSlide key={`categories--key${id}`}>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="aspect-[3/4] w-full rounded-lg object-cover object-center"
                src={imgSrc}
                alt={altImg}
                width="150"
                height="150"
              />

              <Text variant="description">{name}</Text>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
