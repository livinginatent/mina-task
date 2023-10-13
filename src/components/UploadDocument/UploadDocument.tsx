import React from "react";
import { StyledMainWrapper, StyledUploadWrapper } from "./styles";
import TableComponent from "../DataTable/Table/Table";
import Upload from "@/modules/Upload";

type Props = {};

const UploadDocument = (props: Props) => {
  return (
    <StyledMainWrapper>
      <StyledUploadWrapper>
        <Upload />
      </StyledUploadWrapper>
    </StyledMainWrapper>
  );
};

export default UploadDocument;
