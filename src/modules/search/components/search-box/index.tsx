import X from '@modules/common/icons/x';
import { FormEvent } from 'react';
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from '../search-box-wrapper';
import Search from '@modules/common/icons/search';

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
        <div className="w-full cursor-pointer rounded border border-gray-900/50 py-2 transition md:max-w-[550px] px-4 flex flex-row items-center">
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
            className="w-full pr-3 text-sm focus:outline-none bg-transparent placeholder:text-gray-900"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="h-4 w-4 rounded-full flex items-center justify-center text-gray-900 bg-gray-200 mr-[6px]"
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
