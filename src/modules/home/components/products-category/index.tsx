import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Image from 'next/image';

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
  return (
    <div className="py-12 content-container">
      <Carousel
        spaceBetween={10}
        slidesPerView={3}
        prevActivateId="prev-category-carousel-button"
        nextActivateId="next-category-carousel-button"
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {CATEGORY.map(({ id, imgSrc, altImg, name }) => (
          <SwiperSlide key={`category--key${id}`}>
            <div className="relative">
              <Image
                className="object-center object-cover rounded-lg max-h-[300px]"
                src={imgSrc}
                alt={altImg}
                width="500"
                height="300"
              />
              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                {name}
              </button>
              <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}
