import styled from "styled-components";

export const StyledSpinner = styled.div<{ size: string }>`
  display: inline-block;
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  margin: 0.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
