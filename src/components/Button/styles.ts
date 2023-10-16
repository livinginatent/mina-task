import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.shadowGargoyle};
  background-color: transparent;
  padding: 10px 28px;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: 100%;

  &.standard {
    background-color: #22668d;
    border: none;
    padding: 10px;
    width: 100%;
    justify-content: center;
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightDugong};
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        background-color: ${({ theme }) => theme.colors.lightGray};
      }
    }
  }
`;
