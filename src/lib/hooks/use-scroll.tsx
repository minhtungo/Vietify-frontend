import { useState, useEffect } from 'react';

const useScroll = (isHome: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener('scroll', detectScrollY);

      return () => {
        window.removeEventListener('scroll', detectScrollY);
      };
    }
  }, [isHome]);

  return isScrolled;
};

export default useScroll;
