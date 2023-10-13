import React, { useState } from "react";
import {
  Input,
  InputLabel,
  ModalContainer,
  ModalContent,
  Select,
  Title,
  Form, // Add the Form component
} from "./styles";
import { Button } from "../Button";
import { ModalProps } from "./interface";

const Modal = ({ openModal, onClose, onAddData }: ModalProps) => {
  const [inputLen, setInputLen] = useState("");
  const [inputStatus, setInputStatus] = useState("0");

  const handleAddData = (e:Event) => {
    e.preventDefault(); // Prevent the default form submission
    if (inputLen && inputStatus) {
      onAddData({ len: inputLen, status: inputStatus });
      onClose();
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
              {" "}
              {/* Use onSubmit to handle form submission */}
              <InputLabel>Enter Len</InputLabel>
              <Input
                type="text"
                value={inputLen}
                onChange={(e) => setInputLen(e.target.value)}
              />
              <InputLabel>Select Status</InputLabel>
              <Select
                value={inputStatus}
                onChange={(e) => setInputStatus(e.target.value)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Select>
              <Button
                style={{ marginBottom: "4px", marginTop: "4px" }}
                className="standard"
                type="submit" // Set the button type to submit
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

export default Modal;
