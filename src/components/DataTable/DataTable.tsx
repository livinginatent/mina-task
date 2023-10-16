import React, { useRef, useState } from "react";
import {
  StyledAnalysisWrapper,
  StyledButtonWrapper,
  StyledMainWrapper,
} from "./styles";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux"; 
import TableComponent from "./Table/Table";
import { addData, setData } from "@/features/dataSlice";
import { RootState } from "@/store";
import AddDataModal from "../Modals/DataModal/DataModal";
import DataModal from "../Modals/DataModal/DataModal";
import AnalysisModal from "../Modals/AnalysisModal/AnalysisModal";
import * as XLSX from "xlsx"; 

type Props = {};

const DataTable = (props: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dispatch = useDispatch();
  const xlsxData = useSelector((state: RootState) => state.data.xlsxData);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalysisModalOpen, setAnalysisModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeAnalysisModal = () => {
    setAnalysisModalOpen(false);
  };

  const openAnalysisModal = (analysisType: string) => {
    setAnalysis(analysisType);
    setAnalysisModalOpen(true);
  };

  const parseXLSXData = (arrayBuffer: any) => {
    try {
      let data = [];
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      return data;
    } catch (error) {
      console.error("Error parsing XLSX data:", error);
      return null;
    }
  };

  return (
    <StyledMainWrapper>
      <StyledButtonWrapper>
        <Button
          className="standard"
          style={{ width: "100px", margin: "0px 24px 0px 12px" }}
          text={"Load Excel File"}
          onClick={openFileInput}
        />
        <Button
          className="standard"
          style={{ width: "100px" }}
          text={"Add New Data"}
          onClick={openAddModal}
        />
      </StyledButtonWrapper>
      <TableComponent />
      <StyledAnalysisWrapper>
        <Button
          onClick={() => openAnalysisModal("analysis 1")}
          className="standard"
          text={"Analysis 1"}
          disabled={xlsxData.length === 0}
        />
        <Button
          onClick={() => openAnalysisModal("analysis 2")}
          className="standard"
          text={"Analysis 2"}
          disabled={xlsxData.length === 0}
        />
      </StyledAnalysisWrapper>
      <DataModal
        openModal={isAddModalOpen}
        onClose={closeAddModal}
        mode="add"
      />
      {isAnalysisModalOpen && (
        <AnalysisModal
          onClose={closeAnalysisModal}
          isOpen={isAnalysisModalOpen}
          analysis={analysis}
        />
      )}
      <input
        type="file"
        accept=".xlsx"
        hidden
        ref={fileInputRef}
        onChange={async (event: any) => {
          const file = event.target.files[0];
          if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const data = parseXLSXData(arrayBuffer);

            if (data) {
              dispatch(setData(data));
              console.log(data);
            }
          }
        }}
      />
    </StyledMainWrapper>
  );
};

export default DataTable;
