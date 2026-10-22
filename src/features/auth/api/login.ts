import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginWithEmailAndPassword(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		return userCredential;
	} catch (error) {
		throw error;
	}
}
