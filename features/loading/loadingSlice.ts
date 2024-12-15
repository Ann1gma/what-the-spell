import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		changeLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { changeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
