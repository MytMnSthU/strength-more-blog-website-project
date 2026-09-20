import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"

const useAuth = () => { 
	const { user, isAuthLoading } = useContext(AuthContext);

	return {
		user,
		isAuthLoading
	}
}

export default useAuth;