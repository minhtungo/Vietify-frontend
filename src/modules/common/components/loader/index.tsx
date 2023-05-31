import Spinner from '@icons/spinner';
import { Dialog, DialogLoading } from '@modules/ui/dialog';
import { FC } from 'react';

interface loaderProps {
  open: boolean;
}

const Loader: FC<loaderProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogLoading>
        <Spinner size={24} />
      </DialogLoading>
    </Dialog>
  );
};

export default Loader;
