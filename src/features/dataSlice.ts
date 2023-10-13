import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface XLSXState {
  xlsxData: any[]; // Adjust the type according to your XLSX data structure
}

const initialState: XLSXState = {
  xlsxData: [],
};

const xlsxSlice = createSlice({
  name: "xlsx",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.xlsxData = action.payload;
    },
    addData: (
      state,
      action: PayloadAction<{ len: string; status: string }>
    ) => {
      const highestId = state.xlsxData.reduce(
        (maxId, row) => (row.id > maxId ? row.id : maxId),
        0
      );
      const newId = highestId + 1;
      const newData = {
        id: newId,
        len: action.payload.len,
        wkt: "",
        status: action.payload.status,
      };

      return {
        ...state,
        xlsxData: [...state.xlsxData, newData],
      };
    },
  },
});

export const { setData,addData } = xlsxSlice.actions;
export default xlsxSlice.reducer;
