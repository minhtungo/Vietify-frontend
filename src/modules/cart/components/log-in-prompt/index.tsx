import Heading from '@modules/ui/heading';
import { buttonVariants } from '@ui/button';
import Link from 'next/link';

const LogInPrompt = () => {
  return (
    <Link
      href="/account/login"
      className={buttonVariants({
        variant: 'link',
      })}
    >
      <Heading size="md">Login and checkout faster</Heading>
    </Link>
  );
};

export default LogInPrompt;
