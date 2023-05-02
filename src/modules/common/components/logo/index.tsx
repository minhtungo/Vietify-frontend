import Image from 'next/image';
import SVGLogo from '/public/assets/images/logo/logo.svg';
import cn from '@lib/util/cn';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn('w-28 items-center ', className)}>
      <span className="sr-only">Vietify</span>
      <Image src={SVGLogo} alt="" className="" />
    </div>
  );
};

export default Logo;
