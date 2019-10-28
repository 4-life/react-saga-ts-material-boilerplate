import MuiDownshift, { MuiDownshiftProps } from 'mui-downshift';
import React from 'react';

interface Option {
  label: string,
  value: string,
}

type Props = MuiDownshiftProps<Option>;

const SearchableSelect: React.FC<Props> = (props) => {
  const { items } = props;
  const [filteredItems, setFilteredItems] = React.useState(items);

  const handleInputValueChange = React.useCallback(
    (inputValue) => {
      const nextFilteredItems = items.filter(
        (item) => item.label.toLowerCase().includes(
          inputValue.toLowerCase(),
        ),
      );

      setFilteredItems(nextFilteredItems);
    },
    [items, setFilteredItems],
  );

  return (
    <MuiDownshift
      {...props}
      items={filteredItems}
      // https://github.com/downshift-js/downshift#oninputvaluechange
      onInputValueChange={handleInputValueChange}
    />
  );
};

export default SearchableSelect;
