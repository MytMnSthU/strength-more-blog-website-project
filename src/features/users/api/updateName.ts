import { auth } from "../../../config/firebase";
import { updateProfile } from "firebase/auth";

export async function updateUserName(name: string) {
	if (!auth.currentUser) throw new Error("No authenticated user");
	await updateProfile(auth.currentUser, { displayName: name });
	return auth.currentUser;
}
