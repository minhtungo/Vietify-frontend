import cn from '@lib/util/cn';
import { FiEdit } from 'react-icons/fi';
import { IconProps } from 'types/icon';

const Edit: React.FC<IconProps> = ({ className, ...props }) => {
  return <FiEdit className={cn(className)} {...props} />;
};

export default Edit;
