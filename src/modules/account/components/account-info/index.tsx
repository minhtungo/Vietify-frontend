import useToggleState from '@lib/hooks/use-toggle-state';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import Text from '@modules/ui/text';
import Button from '@ui/button';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
};

const AccountInfo = ({
  label,
  currentInfo,
  isLoading,
  isSuccess,
  isError,
  clearState,
  errorMessage = 'An error occurred, please try again',
  children,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${label} updated successfully!`);
      close();
    }
    if (isError) {
      toast.error(`${errorMessage}`);
      close();
    }
  }, [isSuccess, close, isError]);

  return (
    <div className="text-small-regular">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={handleToggle}
        value={state ? label : ''}
      >
        <AccordionItem value={label}>
          <div className="flex items-start justify-between">
            <div>
              <span className="uppercase text-gray-700">{label}</span>
              <div className="flex flex-1 basis-0 items-center justify-end gap-x-4">
                {typeof currentInfo === 'string' ? (
                  <Text variant="label">{currentInfo}</Text>
                ) : (
                  currentInfo
                )}
              </div>
            </div>
            <AccordionTrigger noIcon className="py-0">
              <Button
                className="min-h-[25px] w-[80px]"
                type={state ? 'reset' : 'button'}
              >
                {state ? 'Cancel' : 'Edit'}
              </Button>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="flex flex-col gap-y-2 py-4">
              <div>{children}</div>
              <Button
                isLoading={isLoading}
                className="ml-auto mt-2 w-full small:max-w-[140px]"
                type="submit"
              >
                Save changes
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AccountInfo;
