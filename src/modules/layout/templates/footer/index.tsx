import { footer } from './data';
import Widgets from '@modules/layout/components/footer-widgets/widget';
import Copyright from '@modules/layout/components/copyright';
import { Separator } from '@ui/separator';

const { widgets, payment } = footer;

const Footer = () => {
  return (
    <footer className="content-container mt-[50px] lg:mt-14 2xl:mt-16">
      <Widgets widgets={widgets} variant="default" />
      <Separator />
      <Copyright payment={payment} variant="default" />
    </footer>
  );
};

export default Footer;
