import CategoryIcon from '@icons/category';
import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import Thumbnail from '@modules/products/components/thumbnail';
import { Card, CardContent, CardFooter } from '@modules/ui/card';
import { book } from '@static/book';
import Heading from '@ui/heading';
import Text from '@ui/text';
import { CATEGORY_BREAKPOINTS } from 'static/breakpoints';
import { CATEGORIES } from 'static/categories';

export default function ProductsCategory() {
  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center gap-2">
        <CategoryIcon size={32} className="text-primary" />
        <Heading size="md">{book.category}</Heading>
      </div>
      <Carousel
        breakpoints={CATEGORY_BREAKPOINTS}
        prevActivateId="prev-category-carousel"
        nextActivateId="next-category-carousel"
      >
        {CATEGORIES.map(({ id, imgSrc, altImg, name }) => (
          <SwiperSlide key={`category-${id}`} className="h-full">
            <Card className="">
              <CardContent className="bg-brand/[0.05] py-2">
                <Thumbnail thumbnail={imgSrc} alt={altImg} size="full" />
              </CardContent>
              <CardFooter className="justify-center px-2 py-2">
                <Text
                  size="sm"
                  variant="dark"
                  className="line-clamp-1 !font-semibold"
                  span
                >
                  {name}
                </Text>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
