import { EditCharacterData } from "@/types/Character.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	_id: null,
	uid: null,
	character_level: null,
	character_name: null,
	class: null,
	spell_attack_modifier: null,
	spell_save_dc: null,
	show_prepared_spells: null,
	show_spellslots: null,
	spellslots: null,
} as EditCharacterData;

export const editCharacterSlice = createSlice({
	name: "editCharacter",
	initialState,
	reducers: {
		setCharacter: (state, action: PayloadAction<EditCharacterData>) => {
			state = action.payload;
		},
		reSetCharacter: (state) => {
			state = initialState;
		},
	},
});

export const { setCharacter, reSetCharacter } = editCharacterSlice.actions;

export default editCharacterSlice.reducer;
