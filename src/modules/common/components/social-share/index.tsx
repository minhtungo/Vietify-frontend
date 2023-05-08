import cn from '@lib/util/cn';
import { FC } from 'react';
import { FacebookShareButton, InstapaperShareButton } from 'react-share';

import Facebook from '@icons/facebook';
import Instagram from '@icons/instagram';

interface socialShareProps {
  className?: string;
  shareUrl?: string;
}

const SocialShare: FC<socialShareProps> = ({ className, shareUrl = '' }) => {
  return (
    <div className={cn(className)}>
      <FacebookShareButton url={shareUrl} className="mx-1">
        <Facebook
          size={22}
          className="opacity-60 transition-all hover:opacity-100"
        />
      </FacebookShareButton>
      <InstapaperShareButton url={shareUrl} className="mx-1">
        <Instagram
          size={22}
          className="opacity-60 transition-all hover:opacity-100"
        />
      </InstapaperShareButton>
    </div>
  );
};

export default SocialShare;
