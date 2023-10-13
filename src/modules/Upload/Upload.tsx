import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadIcon } from "./icons";
import { StyledUploadOption } from "./style";
import {
  StyledInput,
  StyledText,
  StyledTextWrapper,
  StyledUploadSpan,
  StyledUploadText,
} from "./style";
import Spinner from "@/components/Spinner";
import { setData, } from "@/features/dataSlice"; // Add setXLSXData action
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx"; // Import the xlsx library

const UploadFiles = ({ style }: { style?: React.CSSProperties }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedFile = useSelector(
    (state: RootState) => state.data.xlsxData
  );

  const handleDrag = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = async (event: any) => {
    event.preventDefault();
    try {
      const file = event.dataTransfer.files[0];

      if (file) {
        setShowSpinner(true);

        const arrayBuffer = await file.arrayBuffer();
        const data = parseXLSXData(arrayBuffer);

        // Dispatch the parsed data
        if (data) {
          
          dispatch(setData(data));
          console.log(data)
        }

        setShowSpinner(false);
      }
    } catch (error) {
      console.error("Error handling dropped file:", error);
    }
  };

  // Function to parse XLSX data
  const parseXLSXData = (arrayBuffer:any) => {
    try {
      let data = [];
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      return data;
    } catch (error) {
      console.error("Error parsing XLSX data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (selectedFile.length!==0) {
      router.push("/view-data");
    }
  }, [selectedFile, router]);

  return (
    <StyledUploadOption
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{ ...style, cursor: "pointer" }}
      onClick={() => inputRef?.current?.click()}
    >
      <UploadIcon />

      {showSpinner ? (
        <Spinner size="40" />
      ) : (
        <StyledTextWrapper>
          <StyledInput
            type="file"
            accept=".xlsx"
            hidden
            id="documentInput"
            onChange={async (event: any) => {
              const file = event.target.files[0];
              if (file) {
                setShowSpinner(true);
                const arrayBuffer = await file.arrayBuffer();
                const data = parseXLSXData(arrayBuffer);

                if (data) {
                  dispatch(setData(data));
                  console.log(data);
                }

                setShowSpinner(false);
              }
            }}
            ref={inputRef}
          />
          <StyledUploadText>
            You can Drag & Drop your Excel file 
            <StyledUploadSpan> or browse</StyledUploadSpan>
          </StyledUploadText>
          <StyledText>Supports .xlsx</StyledText>
        </StyledTextWrapper>
      )}
    </StyledUploadOption>
  );
};

export default UploadFiles;
