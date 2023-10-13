import React, { useState, useEffect } from "react";
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

const AddDataModal = ({ openModal, onClose, onAddData }: ModalProps) => {
  const [inputLen, setInputLen] = useState<number>(0);
  const [inputStatus, setInputStatus] = useState<number>(0);
  const [error, setError] = useState("");

  const resetInputFields = () => {
    setInputLen(0);
    setInputStatus(0);
    setError("");
  };

  useEffect(() => {
    if (openModal) {
      resetInputFields();
    }
  }, [openModal]);

  const handleAddData = (e: Event) => {
    e.preventDefault();
    if (inputLen && !isNaN(inputLen)) {
      onAddData({ len: inputLen, status: inputStatus });
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
            <Title>Add new Data</Title>
            <Form onSubmit={handleAddData}>
              <InputLabel>Enter Len</InputLabel>
              <Input
                type="number" // Use type "number" for the input
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
                text={"Add"}
              />
              <Button
                className="standard"
                text={"Cancel"}
                onClick={handleCloseModal}
              />
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
};

export default AddDataModal;
