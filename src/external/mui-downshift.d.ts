import { DownshiftProps } from 'downshift';

declare module 'mui-downshift' {
  // https://github.com/techniq/mui-downshift/blob/9834d29dd2763981789776a5fce14b5d6c531d27/src/index.js#L90-L110
  type MuiDownshiftProps<Item> = DownshiftProps<Item> & {
    items: Array<Item>,
    itemToString: (item: Item) => string,
    selectedItem: Item,
    getRootProps: Function,

    // Input
    getInputProps: Function,
    focusOnClear: boolean,
    loading: boolean,

    // Menu
    getListItem: Function,
    getListItemKey: Function,
    showEmpty: boolean,
    includeFooter: boolean,
    getInfiniteLoaderProps: Function,
    getVirtualListProps: Function,
    menuHeight: number,
    menuItemCount: number,
  };
}
