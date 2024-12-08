import { SpellDetailsClassObject } from "@/types/DnD5e_API.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	selection: { index: "none", name: "All spells" },
};

export const filterSlice = createSlice({
	name: "selection",
	initialState,
	reducers: {
		changeFilter: (state, action: PayloadAction<SpellDetailsClassObject>) => {
			state.selection = action.payload;
		},
	},
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
