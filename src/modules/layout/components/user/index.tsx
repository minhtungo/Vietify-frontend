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

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const { customer, retrievingCustomer, handleLogout } = useAccount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 duration-150"
        >
          <UserIcon size={23.5} aria-hidden="true" className="text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-[2px] hidden w-full space-y-0 p-0 small:block">
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
            <PopoverClose asChild>
              <button
                className="w-full select-none px-4 py-3 text-left transition-colors hover:bg-accent focus:bg-accent"
                onClick={handleLogout}
              >
                <Text
                  className="text-sm font-medium leading-none text-foreground"
                  as="span"
                >
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
