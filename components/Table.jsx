import React from "react";
import { useTable } from "react-table";

const Table = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "sno",
      },
      {
        Header: "State Name",
        accessor: "stateName",
      },
      {
        Header: "Active Cases",
        accessor: "activeCases",
        type: "number",
      },
      {
        Header: "Cured Cases",
        accessor: "curedCases",
      },
      {
        Header: "Death Cases",
        accessor: "deathCases",
      },
    ],
    []
  );

  const data = React.useMemo(() => props.data, []);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className="w-full">
        <table {...getTableProps()} className="w-full">
          <thead className="bg-white text-black text-center p-3 border border-black">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-200"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border border-gray-300 bg-gray-100"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-center border-r"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
