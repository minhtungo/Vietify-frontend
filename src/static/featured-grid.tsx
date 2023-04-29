import Back from '@icons/back';
import FastDelivery from '@icons/fast-delivery';
import Refresh from '@icons/refresh';

const data = [
  {
    id: 1,
    icon: (
      <FastDelivery
        size={32}
        color="#F38E00"
        className="3xl:scale-100 scale-75 transform xl:scale-90"
      />
    ),
    title: 'Fast & Secure Delivery',
    description:
      'Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.',
    bgColor: '#FFEED6',
  },
  {
    id: 2,
    icon: (
      <Back
        size={32}
        color="#0095E7"
        className="3xl:scale-100 scale-75 transform xl:scale-90"
      />
    ),
    title: 'Money Back Guarantee',
    description:
      'Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.',
    bgColor: '#CCEDFF',
  },

  {
    id: 3,
    icon: (
      <Refresh
        size={36}
        color="#FF7B7B"
        className="3xl:scale-100 scale-75 transform xl:scale-90"
      />
    ),
    title: 'Easy returns',
    description:
      "Just return your product and we'll refund your money. No questions asked – we'll do our best to make sure your return is hassle-free.",
    bgColor: '#FFE1E1',
  },
];

export default data;
