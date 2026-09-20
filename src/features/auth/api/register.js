import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export async function registerWithEmailAndPassword(email, password, name) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		if (name?.trim()) {
			await updateProfile(userCredential.user, {
				displayName: name.trim(),
			});
		}
		return userCredential;
	} catch (error) {
		throw error;
	}
}