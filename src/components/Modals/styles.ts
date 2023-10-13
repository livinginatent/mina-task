import styled from "styled-components";

export const Form = styled.form`
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h3`
  text-align: center;
  border-radius: 4px;
  text-align: center;
  
`;

export const InputLabel = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
  border-radius: 4px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  border-radius: 4px;
  background-color: #8ECDDD;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  border-radius: 4px;
`;


