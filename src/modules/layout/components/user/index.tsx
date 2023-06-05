import UserIcon from '@icons/user';
import { useAccount } from '@lib/context/account-context';
import LogOut from '@modules/common/icons/logout';
import Order from '@modules/common/icons/order';
import Text from '@modules/ui/text';
import Button from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { useRouter } from 'next/router';

interface UserProps {}

const User: React.FC<UserProps> = () => {
  const { customer, handleLogout } = useAccount();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-full p-0 duration-150"
        >
          <UserIcon
            size={23.5}
            aria-hidden="true"
            className="text-foreground/90"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {!customer ? (
          <>
            <DropdownMenuItem onSelect={() => router.push('/account/signup')}>
              <span>Đăng kí</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push('/account/login')}>
              <span>Đăng nhập</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>
              <Text variant="dark" className="!font-semibold" size="sm">
                {`${customer?.first_name} ${customer?.last_name}`}
              </Text>
              <Text size="xs">{customer?.email}</Text>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => router.push('/account')}>
                <UserIcon className="mr-2 h-4 w-4 text-foreground/90" />
                <span>Thông tin tài khoản</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push('/account/orders')}>
                <Order className="mr-2 h-4 w-4 text-foreground/90" />
                <span>Đơn hàng của tôi</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
