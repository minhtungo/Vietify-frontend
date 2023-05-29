import ListItem from '@modules/common/components/list-item';
import Button from '@ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@ui/popover';
import { useAccount } from '@lib/context/account-context';
import Text from '@modules/ui/text';
import { Separator } from '@modules/ui/separator';
import UserIcon from '@icons/user';
import Order from '@modules/common/icons/order';
import LogOut from '@modules/common/icons/logout';

interface UserProps {}

const User: React.FC<UserProps> = () => {
  const { customer, handleLogout } = useAccount();

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="hidden w-full space-y-0 p-1 small:block">
        {!customer ? (
          <>
            <PopoverClose asChild>
              <ListItem href="/account/register">Đăng ký</ListItem>
            </PopoverClose>
            <PopoverClose asChild>
              <ListItem href="/account/login">Đăng nhập</ListItem>
            </PopoverClose>
          </>
        ) : (
          <>
            <div className="px-4 py-2">
              <Text variant="dark" className="!font-semibold" size="sm">
                {`${customer.first_name} ${customer.last_name}`}
              </Text>
              <Text size="xs">{customer.email}</Text>
            </div>
            <Separator />
            <PopoverClose asChild>
              <ListItem href="/account" className="flex items-center gap-1">
                <UserIcon size={18} className="text-foreground/90" />
                Thông tin tài khoản
              </ListItem>
            </PopoverClose>
            <PopoverClose asChild>
              <ListItem
                href="/account/orders"
                className="flex items-center gap-[5.2px]"
              >
                <Order size={18} className="text-foreground/90" />
                Đơn hàng của tôi
              </ListItem>
            </PopoverClose>
            <Separator className="my-2" />
            <PopoverClose asChild>
              <button
                className="flex w-full select-none items-center gap-1 px-4 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent focus:bg-accent"
                onClick={handleLogout}
              >
                <LogOut size={19.5} />
                Đăng xuất
              </button>
            </PopoverClose>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default User;
