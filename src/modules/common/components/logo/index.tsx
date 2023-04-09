import Image from 'next/image';
import { FC } from 'react';

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <div>
      <span className="text-xl font-semibold">Vietify</span>
      {/* <Image
        alt="Logo"
        className="hidden cursor-pointer md:block"
        height="100"
        width="100"
        src="/images/logo.png"
      /> */}
    </div>
  );
};

export default Logo;
