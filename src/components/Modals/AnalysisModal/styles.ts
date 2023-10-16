import styled from "styled-components";

export const StyledAnalysisContainer = styled.div`
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
export const StyledAnalysisContent = styled.div`
  background: #fff;
  width: 700px;
  height: 800px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
`;


export const Title = styled.h3`
  text-align: center;
  border-radius: 4px;
  text-align: center;
`;
