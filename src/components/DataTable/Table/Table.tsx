import React, { useEffect, useRef } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator_bootstrap4.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { deleteData } from "@/features/dataSlice";

const TableComponent = () => {
  const xlsxData = useSelector((state: RootState) => state.data.xlsxData);
  const tabulatorRef = useRef(null as ReactTabulator | null);
  const dispatch = useDispatch();

  const columns = [
    { title: "ID", field: "id", headerFilter: "input", minWidth: 40 },
    { title: "LEN", field: "len", headerFilter: "input" },
    { title: "WKT", field: "wkt", headerFilter: "input" },
    { title: "STATUS", field: "status", headerFilter: "input" },
    {
      formatter: "buttonCross",
      width: 10,
      align: "center",
      cellClick: function (e:Event, cell:any) {
        const rowId = cell.getData().id
        dispatch(deleteData(rowId))
      },
    },
  ];

  const tabulatorData = xlsxData.map((row) => ({
    id: row[0],
    len: row[1],
    wkt: row[2],
    status: row[3],
  }));

  tabulatorData.sort((a, b) => b.id - a.id);

  useEffect(() => {
    if (tabulatorRef.current) {
      tabulatorRef.current.table.setData(tabulatorData);
      tabulatorRef.current.table.redraw(true);
      console.log(xlsxData)
    }
  }, [xlsxData, tabulatorData]);

  return (
    <ReactTabulator
      ref={tabulatorRef}
      data={tabulatorData}
      columns={columns}
      options={{ pagination: "local", paginationSize: 10 }}
    />
  );
};

export default TableComponent;
