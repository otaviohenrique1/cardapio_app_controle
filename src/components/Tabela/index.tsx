import { FaSortDown, FaSortUp } from "react-icons/fa";
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";
import { Col, Table } from "reactstrap";

interface TabelaProps {
  getTableProps: (propGetter?: TablePropGetter<TabelaTypes> | undefined) => TableProps;
  headerGroups: HeaderGroup<TabelaTypes>[];
  getTableBodyProps: (propGetter?: TableBodyPropGetter<TabelaTypes> | undefined) => TableBodyProps;
  page: Row<TabelaTypes>[];
  prepareRow: (row: Row<TabelaTypes>) => void;
}

export function Tabela(props: TabelaProps) {
  const { getTableProps, headerGroups, getTableBodyProps, page, prepareRow } = props;

  return (
    <Col md={12}>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ? <FaSortDown /> : <FaSortUp />
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {(page.length === 0) ? (
            <TabelaVazia />
          ) : (
            page.slice(0, 20).map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="bg-light">
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </Table>
    </Col>
  );
}

function TabelaVazia() {
  return (
    <tr className="bg-light">
      <td colSpan={7} className="text-center h1 p-5">Lista Vazia</td>
    </tr>
  );
}