import Countdown, { zeroPad } from 'react-countdown';

interface CountDownProps {
  date: string | number | Date | undefined;
}

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <span className="flex items-center font-semibold ml-3 gap-1 text-brand-dark">
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-gray-100  rounded p-1">
          {zeroPad(hours)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-gray-100  rounded p-1">
          {zeroPad(minutes)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-gray-100  rounded p-1">
          {zeroPad(seconds)}
        </span>
      </span>
    );
  }
};

const CountDown: React.FC<CountDownProps> = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default CountDown;
