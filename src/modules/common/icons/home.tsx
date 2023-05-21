import cn from '@lib/util/cn';
import { IoHomeOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const Home: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoHomeOutline className={cn(className)} {...props} />;
};

export default Home;
