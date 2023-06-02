import Image from 'next/image';
import SVGLogo from '/public/assets/images/logo/logo.svg';
import cn from '@lib/util/cn';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-24 flex-shrink-0 select-none sm:w-24 md:w-28',
        className
      )}
    >
      <span className="sr-only">Vietify logo</span>
      <Image src={SVGLogo} alt="Vietify logo" className="h-auto max-w-full" />
    </div>
  );
};

export default Logo;
