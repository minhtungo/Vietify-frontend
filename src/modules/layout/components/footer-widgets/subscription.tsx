import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import EmailICon from '@modules/common/icons/email';
import SendIcon from '@modules/common/icons/send';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  className?: string;
}
interface NewsLetterFormValues {
  email: string;
}

const defaultValues = {
  email: '',
};

const WidgetSubscription: React.FC<Props> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });

  const [subscriptionSuccess, setSubscriptionSuccess] =
    useState<Boolean>(false);

  const onSubmit = (values: NewsLetterFormValues, e: any) => {
    e.preventDefault();
    console.log('hello');
    setSubscriptionSuccess(true);

    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);

    // reset form after submit
    e.target.reset();
    console.log(values, 'News letter');
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <Heading size="md" className="mb-4 lg:mb-6 lg:pb-0.5">
        Subscribe Now
      </Heading>

      <p className="lg:-mt-1 max-w-[400px] text-brand-muted text-sm lg:text-[15px]">
        Subscribe your email for newsletter and get notification about new
      </p>
      <form
        noValidate
        className="relative mt-5 max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="flex items-center absolute ltr:left-0 rtl:right-0 top-0 h-12 px-3.5 transform">
          <EmailICon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
        </span>
        <div className="w-full rounded border border-gray-900/50 py-2 transition md:max-w-[550px] px-4 flex items-center h-12">
          <input
            placeholder="Enter your email here"
            type="email"
            id="subscription-email"
            className="w-full text-sm focus:outline-none px-6 placeholder:text-gray-500"
            {...register('email', {
              required: 'Email required',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: `Error`,
              },
            })}
            // error={errors.email?.message}
          />
          <button
            className="absolute right-0 top-0 hover:opacity-80 focus:outline-none h-12 px-3 lg:px-3.5 transform scale-90 2xl:scale-100"
            aria-label="Subscribe Button"
            type="submit"
          >
            <SendIcon className="w-[18px] 2xl:w-5 h-[18px] 2xl:h-5" />
          </button>
        </div>
        {!errors.email && subscriptionSuccess && (
          <p className="my-2 text-13px text-brand">Subscribed</p>
        )}
      </form>
    </div>
  );
};

export default WidgetSubscription;
