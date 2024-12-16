import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isError: true,
	errorMessage: "",
};

export const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		changeIsError: (state, action: PayloadAction<boolean>) => {
			state.isError = action.payload;
		},
		changeErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
	},
});

export const { changeIsError, changeErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
