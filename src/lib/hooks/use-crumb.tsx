import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useCrumb = () => {
  const router = useRouter();

  const crumbList = useMemo(() => {
    const currentPath = router.asPath
      .split('?')[0]
      .split('/')
      .filter((v) => v.length > 0);

    const crumbList = currentPath.map((subpath, idx) => {
      const href = '/' + currentPath.slice(0, idx + 1).join('/');

      const title = subpath;
      return { href, title };
    });

    // Add in a default "Home" crumb for the top-level
    return [{ href: '/', title: 'Home' }, ...crumbList];
  }, [router.asPath]);

  return crumbList;
};

export default useCrumb;
