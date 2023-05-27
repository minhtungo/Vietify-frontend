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
import { useProductCategories } from 'medusa-react';
import { ProductCategory } from '@medusajs/medusa';
import Link from 'next/link';

export default function ProductsCategory() {
  const { product_categories: categories } = useProductCategories();
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
        {categories?.map((category: ProductCategory) => (
          <SwiperSlide key={`category-${category.id}`} className="h-full">
            <Link href={`/c/${category.handle}`}>
              <Card>
                <CardContent className="bg-brand/[0.05] py-2">
                  <Thumbnail
                    thumbnail={CATEGORIES[0].imgSrc}
                    alt={CATEGORIES[0].altImg}
                    size="full"
                  />
                </CardContent>
                <CardFooter className="justify-center px-2 py-2">
                  <Text
                    size="sm"
                    variant="dark"
                    className="line-clamp-1 !font-semibold"
                    span
                  >
                    {category.name}
                  </Text>
                </CardFooter>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
