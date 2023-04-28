import X from '@icons/x';
import { FormEvent } from 'react';
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from '../search-box-wrapper';
import Search from '@icons/search';

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
        <div className="flex w-full cursor-pointer flex-row items-center rounded border border-gray-900/50 px-4 py-2 transition md:max-w-[550px]">
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="w-full bg-transparent pr-3 text-sm placeholder:text-gray-600 focus:outline-none"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="mr-[6px] flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-900"
            >
              <X size={12} />
            </button>
          )}
          <Search size={16} className="text-gray-600" />
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
