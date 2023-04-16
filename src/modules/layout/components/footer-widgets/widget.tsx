import WidgetAbout from './about-us';
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
    <div className="content-container">
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px]">
        <WidgetAbout
          social={social}
          className="mb-4 border-b col-span-full sm:col-span-1 md:col-span-3 sm:border-b-0 border-gray-400/20 sm:mb-0"
        />
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
          />
        ))}
        <WidgetSubscription
          className={cn(
            'pt-8 border-t col-span-full sm:col-span-1 md:col-start-4 xl:col-start-auto md:col-span-4 xl:col-span-3 xl:pl-6 sm:pt-0 sm:border-t-0 border-gray-400/20 2xl:pl-7 3xl:pl-16 3xl:pr-16'
          )}
        />
      </div>
    </div>
  );
};

export default Widgets;
