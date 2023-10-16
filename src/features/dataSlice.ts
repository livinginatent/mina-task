import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface XLSXState {
  xlsxData: any[];
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
      action: PayloadAction<{ len: number; status: number }>
    ) => {
      const highestId = state.xlsxData.reduce(
        (maxId, row) => (row[0] > maxId ? row[0] : maxId),
        0
      );
      const newId = highestId + 1;
      const newData = [newId, action.payload.len, "", action.payload.status];

      state.xlsxData.push(newData);
    },
    deleteData: (state, action: PayloadAction<number>) => {
      const rowIndexToDelete = state.xlsxData.findIndex(
        (row) => row[0] === action.payload
      );

      if (rowIndexToDelete !== -1) {
        state.xlsxData.splice(rowIndexToDelete, 1);
      }
    },
    editData: (
      state,
      action: PayloadAction<{ id: number; len: number; status: number }>
    ) => {
      const { id, len, status } = action.payload;

      const rowIndexToEdit = state.xlsxData.findIndex((row) => row[0] === id);

      if (rowIndexToEdit !== -1) {
        state.xlsxData[rowIndexToEdit][1] = len; 
        state.xlsxData[rowIndexToEdit][3] = status; 
      }
    },
  },
});

export const { setData, addData, deleteData, editData } = xlsxSlice.actions;
export default xlsxSlice.reducer;
