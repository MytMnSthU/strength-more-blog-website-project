import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginWithEmailAndPassword(email, password) {
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
