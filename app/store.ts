import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
