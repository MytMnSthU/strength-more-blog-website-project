import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "@/components/Loader";

const ProtectedRoute = () => {
	const { user, isAuthLoading } = useAuth();

	if (isAuthLoading) {
		return <Loader />;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;