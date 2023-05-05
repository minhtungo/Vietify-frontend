import cn from '@lib/util/cn';
import { FC } from 'react';
import { FacebookShareButton } from 'react-share';

import Heading from '../../../ui/heading';
import Facebook from '@modules/common/icons/facebook';
import Text from '@modules/ui/text';

interface socialShareProps {
  className?: string;
  shareUrl?: string;
}

const SocialShare: FC<socialShareProps> = ({
  className = '',
  shareUrl = '',
}) => {
  return (
    <div className={cn(className)}>
      <Text variant="label" className="mb-2">
        Share in social network
      </Text>
      <div className="-mx-1 flex flex-wrap items-center">
        <FacebookShareButton url={shareUrl} className="mx-1">
          <Facebook size={24} className="transition-all hover:opacity-90" />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
