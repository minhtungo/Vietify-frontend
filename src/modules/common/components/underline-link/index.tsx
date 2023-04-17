import ArrowRight from '@modules/common/icons/arrow-right';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

type UnderlineLinkProps = {
  href: string;
  children?: React.ReactNode;
};

const UnderlineLink = ({ href, children }: UnderlineLinkProps) => {
  return (
    <div className="flex items-start">
      <Link
        href={href}
        className="flex items-center text-large-regular border-b border-current gap-x-2 transition-all duration-300 group hover:pl-1 hover:pr-1"
      >
        <span>{children}</span>
        <IoIosArrowForward
          size={16}
          className="transition-all group-hover:ml-1 duration-300 text-gray-600"
        />
      </Link>
    </div>
  );
};

export default UnderlineLink;
