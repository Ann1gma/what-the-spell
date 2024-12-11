import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Trying to use AuthContext outside of AuthContextProvider");
	}
	return context;
};

export default useAuth;
