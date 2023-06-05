import { useAccount } from '@lib/context/account-context';
import ChevronDown from '@icons/chevron-down';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Button, { buttonVariants } from '@modules/ui/button';
import cn from '@lib/util/cn';
import Text from '@modules/ui/text';

interface AccountNavProps {
  items: {
    href: string;
    title: string;
  }[];
}

const AccountNav: React.FC<AccountNavProps> = ({ items }) => {
  const router = useRouter();

  const { pathname, route } = router;
  const { handleLogout } = useAccount();

  return (
    <div>
      <div className="lg:hidden">
        {route !== '/account' && (
          <Link
            href="/account"
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'gap-1.5 p-0 hover:bg-transparent hover:underline'
            )}
          >
            <ChevronDown className="rotate-90 transform" />
            <Text span variant="dark" size="lg">
              Account
            </Text>
          </Link>
        )}
      </div>
      <nav className="hidden flex-col space-y-1 lg:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href && 'bg-muted',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        ))}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="justify-start hover:bg-muted"
        >
          Đăng xuất
        </Button>
      </nav>
    </div>
  );
};

export default AccountNav;
