import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filtration/filtrationSlice";
import loadingReducer from "@/features/loading/loadingSlice";
import errorReducer from "@/features/error/errorSlice";

const store = configureStore({
	reducer: {
		error: errorReducer,
		filter: filterReducer,
		loading: loadingReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
