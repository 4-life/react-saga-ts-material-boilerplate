import MUIDataTable from 'mui-datatables';
import React from 'react';
import { Skeleton } from '@material-ui/lab';

interface Options {
  customToolbar?: () => void;
}

interface Props {
  options: Options;
  rows: number;
  cols: number;
}

export const TableSkeleton = (props: Props): JSX.Element => {
  const { rows, cols } = props;
  const column = {
    name: '',
    label: '',
    options: {
      filter: false,
      sort: false,
      searchable: false,
      empty: true,
      customBodyRender: () => {
        return <Skeleton variant="rect" />;
      },
    },
  };

  const options = {
    download: false,
    filter: false,
    print: false,
    search: false,
    pagination: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    responsive: 'stacked',
    viewColumns: false,
    ...(props.options.customToolbar && { customToolbar: () => <Skeleton/> })
  };

  return (
    <MUIDataTable
      data={ Array.from({ length: rows }) }
      columns={ Array.from({ length: cols }).map(() => column) }
      options={ options }
    />
  );
};
