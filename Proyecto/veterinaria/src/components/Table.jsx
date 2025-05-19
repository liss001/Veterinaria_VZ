import React from "react";

function Table({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
