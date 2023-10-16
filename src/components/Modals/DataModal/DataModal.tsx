import React, { useState, useEffect, FormEvent } from "react";
import {
  Input,
  InputLabel,
  ModalContainer,
  ModalContent,
  Select,
  Title,
  Form,
  ErrorLabel,
} from "./styles";
import { Button } from "../../Button";
import { ModalProps } from "./interface";
import { useDispatch } from "react-redux";
import { addData, editData } from "@/features/dataSlice";

const DataModal = ({ openModal, onClose, mode, rowData }: ModalProps) => {
  const [inputLen, setInputLen] = useState<number>(0);
  const [inputStatus, setInputStatus] = useState<number>(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const resetInputFields = () => {
    setInputLen(0);
    setInputStatus(0);
    setError("");
  };

  useEffect(() => {
    if (openModal) {
      resetInputFields();
    }
    setInputLen(rowData?.len);
    setInputStatus(rowData?.status);
  }, [openModal, rowData]);

  const handleAddData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputLen && !isNaN(inputLen)) {
      if (mode === "add") {
        dispatch(addData({ len: inputLen, status: inputStatus }));
      } else if (mode === "edit") {
        const updatedData = { ...rowData, len: inputLen, status: inputStatus };
        dispatch(editData(updatedData));
      }
      onClose();
    } else {
      setError("Please enter a valid number for 'len'");
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      {openModal && (
        <ModalContainer>
          <ModalContent>
            <Title>{mode === "add" ? "Add new Data" : "Edit Data"}</Title>
            <Form onSubmit={handleAddData}>
              <InputLabel>Enter Len</InputLabel>
              <Input
                type="number"
                value={inputLen}
                onChange={(e) => {
                  setInputLen(parseFloat(e.target.value));
                  setError("");
                }}
              />
              <InputLabel>Select Status</InputLabel>
              <Select
                value={inputStatus}
                onChange={(e) => setInputStatus(Number(e.target.value))}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </Select>
              {error && <ErrorLabel>{error}</ErrorLabel>}
              <Button
                style={{ marginBottom: "4px", marginTop: "4px" }}
                className="standard"
                type="submit"
                text={mode === "add" ? "Add" : "Edit"}
              />
              <Button
                className="standard"
                text="Cancel"
                onClick={handleCloseModal}
              />
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
};

export default DataModal;
