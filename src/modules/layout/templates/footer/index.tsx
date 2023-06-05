import { footer } from './data';
import Widgets from '@modules/layout/components/footer-widgets/widget';
import Copyright from '@modules/layout/components/copyright';
import { Separator } from '@ui/separator';
import Container from '@modules/layout/components/container';

const { widgets, payment } = footer;

const Footer = () => {
  return (
    <footer>
      <Container className="pt-8 lg:pt-12 2xl:pt-16">
        <Widgets widgets={widgets} variant="default" />
        <Separator />
        <Copyright payment={payment} variant="default" />
      </Container>
    </footer>
  );
};

export default Footer;
