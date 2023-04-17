import { useRouter } from 'next/router';

const useCrumb = () => {
  const router = useRouter();

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
};

export default useCrumb;
