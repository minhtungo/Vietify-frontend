import cn from '@lib/util/cn';
import { TiFlashOutline } from 'react-icons/ti';
import { IconProps } from 'types/icon';

const Flash: React.FC<IconProps> = ({ className, ...props }) => {
  return <TiFlashOutline className={cn(className)} {...props} />;
};

export default Flash;
