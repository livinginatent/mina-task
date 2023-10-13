import React, { useState } from "react";
import { StyledButtonWrapper, StyledMainWrapper } from "./styles";
import { Button } from "../Button";
import Modal from "../Modals/Modal";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import TableComponent from "./Table/Table";
import { addData } from "@/features/dataSlice";
import { RootState } from "@/store";

type Props = {};

const DataTable = (props: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function
    const xlsxData = useSelector((state: RootState) => state.data.xlsxData);


  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddData = (data:any) => {
    dispatch(addData(data)); // Dispatch the addData action with the data
    console.log(xlsxData)
  };

  return (
    <StyledMainWrapper>
      <StyledButtonWrapper>
        <Button
          className="standard"
          style={{ width: "100px", margin: "0px 24px 0px 12px" }}
          text={"Load Excel File"}
        />
        <Button
          className="standard"
          style={{ width: "100px" }}
          text={"Add New Data"}
          onClick={openAddModal}
        />
      </StyledButtonWrapper>
      <TableComponent />
      <Modal
        openModal={isAddModalOpen}
        onAddData={handleAddData}
        onClose={closeAddModal}
      />
    </StyledMainWrapper>
  );
};

export default DataTable;
