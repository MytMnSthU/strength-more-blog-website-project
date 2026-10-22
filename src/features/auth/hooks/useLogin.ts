import { loginWithEmailAndPassword } from "../api/login";

const useLogin = () => {
	const login = async (email: string, password: string) => {
		try {
			const userCredential = await loginWithEmailAndPassword(
				email,
				password,
			);
			return userCredential;
		} catch (error) {
			throw error
		}
	};

	return {
		login,
	};
};

export default useLogin;
