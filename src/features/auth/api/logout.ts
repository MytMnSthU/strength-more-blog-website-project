import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

export async function logoutUser() {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("Error signing out:", error);
	}
};

