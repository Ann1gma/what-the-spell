import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";
import loadingReducer from "@/features/loading/loadingSlice";

const store = configureStore({
	reducer: {
		filter: filterReducer,
		loading: loadingReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
