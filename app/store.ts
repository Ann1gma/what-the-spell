import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";
import addSpellReducer from "@/features/addSpell/addSpellSlice";

const store = configureStore({
	reducer: {
		filter: filterReducer,
		addSpell: addSpellReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
