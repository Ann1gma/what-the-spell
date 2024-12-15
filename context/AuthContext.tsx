import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import LoadingComponent from "@/components/LoadingComponent";

interface AuthContextType {
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	signup: (email: string, password: string) => Promise<UserCredential>;
	currentUser: User | null;
	userEmail: string | null;
	userName: string | null;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const login = async (email: string, password: string) => {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential;
	};

	const logout = async () => {
		await signOut(auth);
	};

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			if (user) {
				setUserEmail(user.email);
				setUserName(user.displayName);
			} else {
				setUserEmail(null);
				setUserName(null);
			}
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				signup,
				userEmail,
				userName,
				isLoading,
			}}
		>
			{isLoading ? <LoadingComponent /> : children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
