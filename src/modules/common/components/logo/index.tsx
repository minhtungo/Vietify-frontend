import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <Link href="/" className="flex items-center">
      <span className="sr-only">Vietify</span>
      <span className="text-xl font-semibold">Vietify</span>
    </Link>
  );
};

export default Logo;
