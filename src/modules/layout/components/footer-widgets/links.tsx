import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Link from '@common/link';

interface Props {
  className?: string;
  data: {
    title?: string;
    lists: {
      id: string;
      path: string;
      title: string;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { title, lists } = data;
  return (
    <div className={cn(className)}>
      <Heading size="sm" className="mb-4 pb-0.5 sm:mb-5 lg:mb-6">
        {title}
      </Heading>
      <ul className="flex flex-col space-y-3 text-sm lg:text-[15px]">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            <Link
              href={list.path}
              className="text-brand-muted transition-colors duration-200 hover:text-brand"
            >
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
