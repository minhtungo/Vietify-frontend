import CategoryIcon from '@icons/category';
import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import { book } from '@static/book';
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
        <Heading variant="md">{book.category}</Heading>
      </div>
      <Carousel
        breakpoints={CATEGORY_BREAKPOINTS}
        prevActivateId="prev-category-carousel-button"
        nextActivateId="next-category-carousel-button"
        prevButtonClassName="left-2"
        nextButtonClassName="right-2"
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
