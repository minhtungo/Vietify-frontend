import Countdown, { zeroPad } from 'react-countdown';

interface CountDownProps {
  date: string | number | Date | undefined;
}

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold sm:text-sm md:text-base">
        <TimeUnit value={hours} />
        :
        <TimeUnit value={minutes} />
        :
        <TimeUnit value={seconds} />
      </span>
    );
  }
};

const TimeUnit = ({ value }: { value: number }) => (
  <span className="flex items-center justify-center rounded bg-primary/90 px-1.5 py-[2px] text-primary-foreground">
    {zeroPad(value)}
  </span>
);

const CountDown: React.FC<CountDownProps> = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default CountDown;
