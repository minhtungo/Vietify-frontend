import cn from '@lib/util/cn';
import { FC } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

import Heading from '../heading';

interface socialShareProps {
  className?: string;
  shareUrl?: string;
}

const SocialShare: FC<socialShareProps> = ({
  className = '',
  shareUrl = '',
}) => {
  return (
    <div
      className={cn(
        'shadow bg-brand-light rounded-md p-4 md:p-6 lg:p-7',
        className
      )}
    >
      <Heading size="sm" className="mb-2">
        Share in social network
      </Heading>
      <div className="flex flex-wrap items-center mb-4 -mx-1">
        <FacebookShareButton url={shareUrl} className="mx-1">
          <FacebookIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
