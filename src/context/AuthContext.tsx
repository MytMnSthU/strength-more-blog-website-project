import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import type { User } from "firebase/auth";

type AuthContextType = {
	user: User | null;
	isAuthLoading: boolean;
}

type AuthProviderProps = {
	children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsAuthLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuthLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
export default AuthContext;
