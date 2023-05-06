import X from '@icons/x';
import { FormEvent } from 'react';
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from '../search-box-wrapper';
import Search from '@icons/search';
import { Input } from '@modules/ui/input';
import Button from '@modules/ui/button';

const ControlledSearchBox = ({
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div {...props} className="w-full">
      <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="relative flex w-full min-w-[400px] items-center">
          <Input
            ref={inputRef}
            className="h-9 w-full border-gray-400 pl-4 pr-[55px]"
            type="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {value && (
            <Button
              onClick={handleReset}
              variant="ghost"
              className="absolute right-8 h-6 w-6 rounded-full p-0 text-muted-foreground duration-150"
            >
              <X size={16} />
            </Button>
          )}
          <Search
            size={20}
            className="absolute right-2 text-muted-foreground"
          />
        </div>
      </form>
    </div>
  );
};

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox {...props} />
          </>
        );
      }}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
