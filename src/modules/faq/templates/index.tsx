import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { FC } from 'react';

interface faqTemplateProps {}

const FAQS = [
  {
    question: 'What type of books do you sell on your website?',
    answer:
      "We sell a wide variety of books including fiction, non-fiction, children's books, academic books, textbooks, and more.",
  },
  {
    question: 'How do I search for a specific book on your website?',
    answer:
      'You can use the search bar on our website to search for a specific book.',
  },
  {
    question: 'What is the process for placing an order on your website?',
    answer:
      'To place an order on our website, add the books you wish to purchase to your cart and proceed to checkout.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept a variety of payment methods including credit/debit cards, PayPal, and bank transfers.',
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'We offer free shipping on orders over $50.',
  },
  {
    question: 'How long does it take for my order to be processed and shipped?',
    answer:
      'Orders are usually processed and shipped within 1-2 business days.',
  },
  {
    question: 'What shipping options are available?',
    answer:
      'We offer a variety of shipping options including standard shipping, expedited shipping, and international shipping.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of purchase as long as the books are in their original condition.',
  },
  {
    question: 'Can I leave a review of the books I purchased on your website?',
    answer:
      'Yes, we encourage customers to leave reviews of the books they have purchased on our website.',
  },
  {
    question: 'Do you offer any discounts or promotions?',
    answer:
      'Yes, we offer discounts and promotions throughout the year. Be sure to sign up for our newsletter to stay informed.',
  },
];

const FaqTemplate: FC<faqTemplateProps> = ({}) => {
  return (
    <Accordion type="single" collapsible className="content-container w-full">
      {FAQS.map((faq, index) => (
        <AccordionItem value={faq.answer} key={index}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqTemplate;
