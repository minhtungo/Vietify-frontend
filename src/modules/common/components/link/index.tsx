import clsxm from '@lib/clsxm';
import NextLink from 'next/link';
import { FC } from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: FC<LinkProps> = ({ href, children, className }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <NextLink href={href} className={clsxm(className)}>
        {children}
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={clsxm(className)}>
        {children}
      </a>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={clsxm(className)}
    >
      {children}
    </a>
  );
};

export default Link;
