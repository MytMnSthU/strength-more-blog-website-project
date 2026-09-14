import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/logout";

const useLogout = () => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await logoutUser();
			navigate("/");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return { logout };
};

export default useLogout;