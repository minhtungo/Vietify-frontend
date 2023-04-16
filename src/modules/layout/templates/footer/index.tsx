import FooterNav from '@modules/layout/components/footer-nav';
import { footer } from './data';
import Widgets from '@modules/layout/components/footer-widgets/widget';
import Copyright from '@modules/layout/components/copyright';

const { widgets, payment } = footer;

const Footer = () => {
  return (
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16">
      <Widgets widgets={widgets} variant="default" />
      <Copyright payment={payment} variant="default" />
    </footer>
  );
};

export default Footer;
