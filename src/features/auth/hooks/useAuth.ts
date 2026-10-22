import { useContext } from "react"
import AuthContext from "@/context/AuthContext"

const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error("Must be used with AuthProvider");
	}

	const { user, isAuthLoading } = context;

	return {
		user,
		isAuthLoading
	}
}

export default useAuth;