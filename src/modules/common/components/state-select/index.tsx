import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/ui/select';
import { FC } from 'react';

interface StateSelectProps {}

const StateSelect: FC<StateSelectProps> = ({}) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Region/State" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="CA">California</SelectItem>
        <SelectItem value="TEXAS">Texas</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StateSelect;
