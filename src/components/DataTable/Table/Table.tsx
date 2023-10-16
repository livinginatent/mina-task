import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator_bootstrap4.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { deleteData, editData } from "@/features/dataSlice";
import MapComponent from "@/components/MapComponent/MapComponent";
import { FirstChild, SecondChild, StyledWrapper } from "./styles";
import DataModal from "@/components/Modals/DataModal/DataModal";
import { TableProps } from "./interface";

const TableComponent = ({}: TableProps) => {
  const xlsxData = useSelector((state: RootState) => state.data.xlsxData);
  const tabulatorRef = useRef(null as ReactTabulator | null);
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "ID", field: "id", headerFilter: "input", width: 120 },
    { title: "LEN", field: "len", headerFilter: "input", width: 240 },
    { title: "WKT", field: "wkt", headerFilter: "input", width: 540 },
    { title: "STATUS", field: "status", headerFilter: "input", width: 120 },

    {
      formatter: "buttonCross",
      width: 70,
      align: "center",
      headerSort: false,
      cellClick: (e: Event, cell: any) => {
        const row = cell.getRow();

        dispatch(deleteData(row.getData().id));
      },
    },
    {
      formatter: (cell) => {
        return "<button class='btn-edit'>Edit</button>";
      },
      width: 10,
      align: "center",
      headerSort: false,
      cellClick: (e: Event, cell: any) => {
        const row = cell.getRow();
        const rowData = row.getData();
        setSelectedRow(rowData);
        openEditModal();
      },
    },
    {
      formatter: (cell) => {
        return "<button class='btn-map'>Map</button>";
      },
      field: "showOnMap",
      headerSort: false,
      width: 100,
      margin: 20,
      align: "right",

      cellClick: (e: Event, cell: any) => {
        const row = cell.getRow();
        const rowData = row.getData();
        setSelectedRow(rowData);
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
      console.log(xlsxData);
    }
  }, [xlsxData, tabulatorData, editData]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <StyledWrapper>
        <FirstChild>
          <ReactTabulator
            ref={tabulatorRef}
            data={tabulatorData}
            columns={columns}
            options={{ pagination: "local", paginationSize: 10 }}
          />
        </FirstChild>

        {isEditModalOpen && selectedRow && (
          <DataModal
            openModal={isEditModalOpen}
            onClose={closeEditModal}
            mode="edit"
            rowData={selectedRow}
            onEditData={(editedData: {
              id: number;
              len: string;
              status: string;
            }) => {
              dispatch(editData(editedData));
              closeEditModal();
            }}
          />
        )}
        <SecondChild>
          {selectedRow && (
            <MapComponent
              initialCenter={[parseFloat(selectedRow.len), 0]}
              initialZoom={2}
              wkt={selectedRow.wkt}
            />
          )}
        </SecondChild>
      </StyledWrapper>
    </>
  );
};

export default TableComponent;
