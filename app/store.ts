import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";
import addSpellReducer from "@/features/addSpell/addSpellSlice";
import errorReducer from "@/features/error/errorSlice";

const store = configureStore({
	reducer: {
		filter: filterReducer,
		addSpell: addSpellReducer,
		error: errorReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
