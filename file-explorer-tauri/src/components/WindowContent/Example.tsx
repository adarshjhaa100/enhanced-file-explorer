import {
    // MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    // MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    type MRT_ColumnDef,
    useMaterialReactTable,
    MRT_RowSelectionState,
  } from 'material-react-table';
  import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
  import { type Person, data } from '../../data/makeData';
import { useEffect, useState } from 'react';
  
  const columns: MRT_ColumnDef<Person>[] = [
    {
      accessorKey: 'fileName',
      header: 'File Name',
    },
    {
      accessorKey: 'size',
      header: 'Size',
    },
    {
      accessorKey: 'dateCreated',
      header: 'Date Created',
    },
    {
      accessorKey: 'dateModified',
      header: 'Date Modfied',
    },
    {
      accessorKey: 'format',
      header: 'Format',
    },
  ];
  
  const Example: React.FC<any> = (props: any) => {
    const {tableView, setTableView} = props;
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available
    

    const table = useMaterialReactTable({
      columns,
      data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      state: { rowSelection },
      initialState: {
        pagination: { pageSize: 5, pageIndex: 0 },
        showGlobalFilter: true,
      },
      //customize the MRT components
      muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 15],
        variant: 'text',
      },
      paginationDisplayMode: 'pages',
    });

    useEffect(()=>{
      setTableView(table);

    }, [rowSelection]);
  
    return (
      <Stack sx={{ m: '2rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/**
           * Use MRT components along side your own markup.
           * They just need the `table` instance passed as a prop to work!
           */}
          {/* <MRT_GlobalFilterTextField table={table} />
          <MRT_TablePagination table={table} /> */}  
        </Box>
        {/* Using Vanilla Material-UI Table components here */}
        <TableContainer>
          <Table>
            {/* Use your own markup, customize however you want using the power of TanStack Table */}
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell align="center" variant="head" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.Header ??
                              header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow key={row.id} selected={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell, _columnIndex) => (
                    <TableCell align="center" variant="body" key={cell.id}>
                      {/* Use MRT's cell renderer that provides better logic than flexRender */}
                      <MRT_TableBodyCellValue
                        cell={cell}
                        table={table}
                        staticRowIndex={rowIndex} //just for batch row selection to work
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Stack>
    );
  };
  
  export default Example;
  