import { useAccount } from '@lib/context/account-context';
import ChevronDown from '@icons/chevron-down';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AccountNav = () => {
  const { route } = useRouter();
  const { handleLogout } = useAccount();

  return (
    <div>
      <div className="small:hidden">
        {route !== '/account' && (
          <Link
            href="/account"
            className="text-small-regular flex items-center gap-x-2 py-2"
          >
            <ChevronDown className="rotate-90 transform" />
            <span>Account</span>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="py-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route}>
                  Orderssony headphone1
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
};

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href;
  return (
    <Link
      href={href}
      className={clsx('text-gray-700', {
        'font-semibold text-gray-900': active,
      })}
    >
      {children}
    </Link>
  );
};

export default AccountNav;
