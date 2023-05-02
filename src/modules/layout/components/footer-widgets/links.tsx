import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Link from '@common/link';
import Text from '@modules/ui/text';

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
      <Heading variant="small" className="mb-3 lg:mb-4">
        {title}
      </Heading>
      <ul className="flex flex-col space-y-2">
        {lists.map((list) => (
          <li key={`widget-list--key${list.id}`}>
            <Link href={list.path}>
              <Text variant="link">{list.title}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
