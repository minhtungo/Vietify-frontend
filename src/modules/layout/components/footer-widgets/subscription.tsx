import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import EmailICon from '@icons/email';
import SendIcon from '@icons/send';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@modules/ui/input';
import Button from '@modules/ui/button';

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

    setSubscriptionSuccess(true);

    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);

    // reset form after submit
    e.target.reset();
    console.log(values, 'News letter');
  };

  return (
    <div className={cn('flex flex-col sm:-mt-[6px]', className)}>
      <Heading variant="sm" className="mb-3 lg:mb-4">
        Subscribe Now
      </Heading>

      <p className="text-sm text-brand-muted lg:text-[15px]">
        Subscribe your email for newsletter and get notification about new
      </p>
      <form noValidate className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex h-12 w-full items-center md:max-w-[550px]">
          <EmailICon className="absolute left-3 h-4 w-4 text-muted-foreground 2xl:h-[18px] 2xl:w-[18px] " />
          <Input
            placeholder="Enter your email here"
            type="email"
            id="subscription-email"
            className="w-full px-9"
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
          <Button
            variant="fade"
            className="absolute right-0 top-0 h-full text-brand-muted"
            aria-label="Subscribe Button"
            type="submit"
          >
            <SendIcon className="h-[18px] w-[18px]" />
          </Button>
        </div>
        {!errors.email && subscriptionSuccess && (
          <p className="my-2 text-brand">Subscribed</p>
        )}
      </form>
    </div>
  );
};

export default WidgetSubscription;
