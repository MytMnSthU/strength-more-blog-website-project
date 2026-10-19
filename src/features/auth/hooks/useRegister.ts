import { registerWithEmailAndPassword } from "../api/register";

const useRegister = () => {
	const register = async (email, password, name) => {
		try {
			const userCredential = await registerWithEmailAndPassword(
				email,
				password,
				name,
			);
			return userCredential;
		} catch (error) {
			throw error;
		}
	};

	return {
		register,
	};
};

export default useRegister;