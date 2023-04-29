import X from '@icons/x';
import { FormEvent } from 'react';
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from '../search-box-wrapper';
import Search from '@icons/search';
import { Input } from '@modules/ui/input';

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
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="relative flex w-full max-w-[550px] items-center space-x-2">
          <Input
            ref={inputRef}
            className="w-full pl-4 pr-[55px]"
            type="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="absolute right-8 flex h-4 w-4 items-center justify-center rounded-full bg-accent"
            >
              <X size={10} />
            </button>
          )}
          <Search size={20} className="absolute right-2 text-gray-600" />
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
