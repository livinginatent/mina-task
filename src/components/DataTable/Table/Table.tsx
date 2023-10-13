import React, { useEffect, useRef } from "react";
import { Tabulator } from "tabulator-tables";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator_bootstrap4.css";
import { StyledWrapper } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactTabulator } from "react-tabulator";

const TableComponent = () => {
  const xlsxData = useSelector((state: RootState) => state.data.xlsxData);
  
  const columns = [
    { title: "ID", field: "id", headerFilter: "input", minWidth: 40 },
    { title: "LEN", field: "len", headerFilter: "input" },
    { title: "WKT", field: "wkt", headerFilter: "input" },
    { title: "STATUS", field: "status", headerFilter: "input" },
  ];

  const tabulatorData = xlsxData.map((row) => ({
    id: row[0],
    len: row[1],
    wkt: row[2],
    status: row[3],
  }));

  tabulatorData.sort((a, b) => b.id - a.id);


  return (
    <ReactTabulator
      data={tabulatorData}
      columns={columns}
      options={{ pagination: "local", paginationSize: 10 }}
    />
  );
};

export default TableComponent;
