import UnderlineLink from '@common/underline-link';

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 px-8 py-24 text-center">
      <h1 className="text-2xl-semi">Your shopping bag is empty</h1>
      <p className="text-base-regular mb-6 mt-4 max-w-[32rem]">
        You don&apos;t have anything in your bag. Let&apos;s change that, use
        the link below to start browsing our products.
      </p>
      <div>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
