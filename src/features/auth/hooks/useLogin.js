import { loginWithEmailAndPassword } from "../api/login";
import { useState } from "react";

const useLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password) => {
		try {
			setIsLoading(true);
			setError(null);

			const userCredential = await loginWithEmailAndPassword(
				email,
				password,
			);
			return userCredential;
		} catch (error) {
			setError(error);
			throw error
		} finally {
			setIsLoading(false);
		}
	};

	return {
		login,
		isLoading,
		error,
	};
};

export default useLogin;
