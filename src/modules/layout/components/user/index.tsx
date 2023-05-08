import UserIcon from '@icons/user';
import ListItem from '@modules/common/components/list-item';
import Button from '@modules/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@ui/popover';

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
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
        <PopoverClose asChild>
          <ListItem href="/account">Create an account</ListItem>
        </PopoverClose>
        <PopoverClose asChild>
          <ListItem href="/account">Sign in</ListItem>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default User;
