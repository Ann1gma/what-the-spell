import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";
import addSpellReducer from "@/features/addSpell/addSpellSlice";
import errorReducer from "@/features/error/errorSlice";
import editCharacterReducer from "@/features/editCharacter/editCharacterSlice";

const store = configureStore({
	reducer: {
		filter: filterReducer,
		addSpell: addSpellReducer,
		error: errorReducer,
		editCharacter: editCharacterReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
