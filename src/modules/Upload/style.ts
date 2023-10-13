import styled from "styled-components";

export const StyledUploadText = styled.p`
  color: #fff;
  font-size: 16px;
  line-height: 25px;
  background-color: transparent;
`;

export const StyledUploadSpan = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
`;

export const StyledTextWrapper = styled.div`
background-color: transparent;
`;

export const StyledText = styled.p`
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
  background-color: transparent;
`;

export const StyledInput = styled.input`
  background-color: transparent;
`;

export const StyledUploadOption = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.dayMercury};
  border-radius: 12px;
  background-color: transparent;
  text-align: center;
  padding: 32px;
`;
