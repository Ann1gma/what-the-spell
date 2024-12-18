import { AddSpellType } from "@/types/Character.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	showAddSpells: false,
	spellToAdd: { index: "", level: null } as AddSpellType,
};

export const addSpellSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		setShowAddSpells: (state, action: PayloadAction<boolean>) => {
			state.showAddSpells = action.payload;
		},
		setSpellToAdd: (state, action: PayloadAction<AddSpellType>) => {
			state.spellToAdd = action.payload;
		},
	},
});

export const { setShowAddSpells, setSpellToAdd } = addSpellSlice.actions;

export default addSpellSlice.reducer;
