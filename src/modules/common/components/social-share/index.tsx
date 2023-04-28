import cn from '@lib/util/cn';
import { FC } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

import Heading from '../../../ui/heading';

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
        'rounded-md bg-brand-light p-4 shadow md:p-6 lg:p-7',
        className
      )}
    >
      <Heading size="sm" className="mb-2">
        Share in social network
      </Heading>
      <div className="-mx-1 mb-4 flex flex-wrap items-center">
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
