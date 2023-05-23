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
    <form
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="relative ml-auto flex w-full flex-1 md:max-w-[550px] 3xl:max-w-[700px]"
    >
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <Search className="h-[21px] w-[21px] text-foreground/90" />
      </div>
      <Input
        ref={inputRef}
        className="flex w-full flex-1 border-gray-300 bg-gray-50 py-3 pl-3 pr-12"
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <Button
          onClick={handleReset}
          variant="fade"
          className="absolute inset-y-0 right-9 flex items-center p-0 text-muted-foreground duration-150"
        >
          <X size={20} />
        </Button>
      )}
    </form>
  );
};

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return <ControlledSearchBox {...props} />;
      }}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
