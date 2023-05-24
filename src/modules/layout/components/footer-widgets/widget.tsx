import WidgetAbout from './about';
import WidgetLink from './links';
import { footer } from '@modules/layout/templates/footer/data';
import WidgetSubscription from './subscription';
import cn from '@lib/util/cn';

interface WidgetsProps {
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    title: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { social } = footer;
  return (
    <div className="grid grid-cols-2 gap-5 pb-[50px] sm:gap-9 md:grid-cols-7 lg:gap-11 xl:grid-cols-12 xl:gap-7">
      <WidgetAbout
        social={social}
        className="col-span-full mb-4 border-b border-border sm:col-span-1 sm:mb-0 sm:border-b-0 md:col-span-3"
      />
      {widgets?.map((widget) => (
        <WidgetLink
          key={`footer-widget--key${widget.id}`}
          data={widget}
          className="col-span-1 pb-3.5 sm:pb-0 md:col-span-2"
        />
      ))}
      <WidgetSubscription
        className={cn(
          'col-span-full border-t border-gray-400/20 pt-8 sm:col-span-1 sm:border-t-0 sm:pt-0 md:col-span-4 md:col-start-4 xl:col-span-3 xl:col-start-auto xl:pl-6 2xl:pl-7'
        )}
      />
    </div>
  );
};

export default Widgets;
