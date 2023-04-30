import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@ui/heading';
import CategoryIcon from '@icons/category';
import Image from 'next/image';
import { useCollections } from 'medusa-react';

const CATEGORY = [
  {
    id: 1,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '1',
    name: 'Friction',
    expanded: true,
  },
  {
    id: 2,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '2',
    name: 'Non-Fiction',
    expanded: false,
  },
  {
    id: 3,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '3',
    name: 'Mystery',
    expanded: false,
  },
  {
    id: 4,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '4',
    name: 'Fantasy',
    expanded: false,
    mdExpanded: true,
  },
  {
    id: 5,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '5',
    name: 'Romance',
    expanded: true,
  },
  {
    id: 6,
    imgSrc:
      'https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png',
    altImg: '6',
    name: 'Science Fiction',
    expanded: false,
  },
];

export default function ProductsCategory() {
  const { collections, isLoading } = useCollections();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center">
        <CategoryIcon size={32} className="mr-2 text-primary" />
        <Heading className="text-left">Categories</Heading>
      </div>
      <Carousel
        spaceBetween={10}
        slidesPerView={5}
        prevActivateId="prev-category-carousel-button"
        nextActivateId="next-category-carousel-button"
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {CATEGORY.map(({ id, imgSrc, altImg, name }) => (
          <SwiperSlide key={`category--key${id}`}>
            <div className="relative">
              <Image
                className="max-h-[200px] rounded-lg object-cover object-center"
                src={imgSrc}
                alt={altImg}
                width="500"
                height="300"
              />
              <button className="absolute bottom-4 z-10 w-36 bg-white py-3 text-base font-medium leading-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                {name}
              </button>
              <div className="absolute bottom-3 z-0 w-36 bg-white bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
