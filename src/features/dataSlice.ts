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
        (maxId, row) => (row[0] > maxId ? row[0] : maxId),
        0
      );
      const newId = highestId + 1;
      const newData = [
        newId,
        action.payload.len,
        "", // Include the 'wkt' field with a default value or retrieve it from somewhere
        action.payload.status,
      ];

      state.xlsxData.push(newData); // Modify the state directly
    },
    deleteData: (state, action: PayloadAction<number>) => {
      // Find the index of the row to delete based on the 'id'
      const rowIndexToDelete = state.xlsxData.findIndex(
        (row) => row[0] === action.payload
      );

      if (rowIndexToDelete !== -1) {
        state.xlsxData.splice(rowIndexToDelete, 1); // Remove the row
      }
    },
  },
});

export const { setData,addData, deleteData } = xlsxSlice.actions;
export default xlsxSlice.reducer;
