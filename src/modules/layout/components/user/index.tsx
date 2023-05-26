import UserIcon from '@icons/user';
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

interface UserProps {}

const User: React.FC<UserProps> = () => {
  const { customer, handleLogout } = useAccount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 duration-150"
        >
          <UserIcon
            size={23.5}
            aria-hidden="true"
            className="text-foreground/90"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="hidden w-full space-y-0 p-0 small:block">
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
            <PopoverClose asChild>
              <ListItem href="/account">Thông tin của tôi</ListItem>
            </PopoverClose>
            <PopoverClose asChild>
              <ListItem href="/account/orders">Đơn hàng của tôi</ListItem>
            </PopoverClose>
            <Separator className="my-2" />
            <PopoverClose asChild>
              <button
                className="w-full select-none px-4 py-2 text-left transition-colors hover:bg-accent focus:bg-accent"
                onClick={handleLogout}
              >
                <Text variant="dark" className="font-medium leading-none" span>
                  Đăng xuất
                </Text>
              </button>
            </PopoverClose>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default User;
