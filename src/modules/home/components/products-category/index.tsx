import cn from '@lib/util/cn';
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
    <div className="py-12">
      <div className="flex justify-center items-center content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-2.5 w-full">
          {CATEGORY.map(
            ({ id, imgSrc, altImg, name, expanded, mdExpanded }) => (
              <div
                className={cn(
                  'relative group flex justify-center items-center h-full max-h-[300px] w-full ',
                  expanded
                    ? 'lg:col-span-3 md:col-span-2'
                    : 'lg:col-span-2 md:col-span-1 ',
                  mdExpanded && 'md:col-span-2'
                )}
                key={id}
              >
                <Image
                  className="object-center object-cover h-full w-full rounded-lg"
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
