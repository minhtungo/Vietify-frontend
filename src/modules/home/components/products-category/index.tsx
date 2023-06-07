import CategoryIcon from '@icons/category';
import { medusaClient } from '@lib/config';
import { ProductCategory } from '@medusajs/medusa';
import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import Container from '@modules/layout/components/container';
import Thumbnail from '@modules/products/components/thumbnail';
import { Card, CardContent, CardFooter } from '@modules/ui/card';
import { book } from '@static/book';
import Heading from '@ui/heading';
import Text from '@ui/text';
import { useProductCategories } from 'medusa-react';
import Link from 'next/link';
import { CATEGORY_BREAKPOINTS } from 'static/breakpoints';
import { CATEGORIES } from 'static/categories';
import { useQuery } from '@tanstack/react-query';

const fetchProductsCategory = async () => {
  return await medusaClient.productCategories
    .list({})
    .then(({ product_categories }) =>
      product_categories.filter(
        (category) => category.parent_category_id === null
      )
    );
};

export default function ProductsCategory() {
  const { data: categories } = useQuery(['get_categories'], () =>
    fetchProductsCategory()
  );

  categories?.map((category: ProductCategory) => console.log(category.handle));

  return (
    <Container className="my-12">
      <div className="mb-6 flex items-center gap-2">
        <CategoryIcon size={32} className="text-primary" />
        <Heading size="lg">{book.category}</Heading>
      </div>
      <Carousel
        breakpoints={CATEGORY_BREAKPOINTS}
        prevActivateId="prev-category-carousel"
        nextActivateId="next-category-carousel"
      >
        {categories?.map((category: ProductCategory) => (
          <SwiperSlide key={`category-${category.id}`} className="h-full">
            <Link href={`/shop/${category.handle}`}>
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
    </Container>
  );
}
