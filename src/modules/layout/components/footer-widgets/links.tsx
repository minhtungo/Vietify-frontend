import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import Link from '@modules/common/components/link';

interface Props {
  className?: string;
  data: {
    title?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { title, lists } = data;
  return (
    <div className={cn(className)}>
      <Heading size="md" className="mb-4 sm:mb-5 lg:mb-6 pb-0.5">
        {title}
      </Heading>
      <ul className="flex flex-col space-y-3 text-sm lg:text-[15px]">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                {list.icon}
              </span>
            )}

            <Link
              href={list.path ? list.path : '#!'}
              className="text-brand-muted transition-colors duration-200 hover:text-brand"
            >
              {`${list.title}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
