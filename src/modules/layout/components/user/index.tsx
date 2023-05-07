import UserIcon from '@icons/user';
import cn from '@lib/util/cn';
import { buttonVariants } from '@modules/ui/button';
import Link from 'next/link';

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  return (
    <Link
      href="/account"
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className: 'relative h-10 w-10 rounded-full p-0 duration-150',
        })
      )}
    >
      <UserIcon size={23.5} aria-hidden="true" className="text-gray-600" />
      <span className="sr-only">User</span>
    </Link>
  );
};

export default User;
