import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

import ArticleDetail from "./features/articles/components/ArticleDetail";
import ArticleList from "./features/articles/components/ArticleList";
import CategoryList from "./features/categories/components/CategoryList";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./MainLayout";
import { AppContext } from "./context/AppContext";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import Profile from "./features/users/components/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
	const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
	const [mode, setMode] = useState("light");

	const toggleSearchModal = () => {
		setIsSearchModalOpened(!isSearchModalOpened);
	};

	const toggleTheme = (mode) => {
		if (mode === "light") {
			setMode("dark");
			document.documentElement.classList.add("dark");
			localStorage.setItem("SMtheme", "dark");
		} else {
			setMode("light");
			document.documentElement.classList.remove("dark");
			localStorage.setItem("SMtheme", "light");
		}
	};

	// Route configuration for createBrowserRouter
	const router = createBrowserRouter([
		{
			element: <MainLayout />,
			children: [
				{
					path: "/",
					element: <ArticleList title="Recent Articles" />,
				},
				{
					path: "articles/popular",
					element: (
						<ArticleList
							title="Popular Articles"
							category="popular"
						/>
					),
				},
				{
					path: "articles/:articleId",
					element: <ArticleDetail />,
				},
				{
					path: "categories",
					element: <CategoryList />,
				},
				{
					path: "categories/:categoryId",
					element: <ArticleList title="Category" />,
				},
				{
					path: "login",
					element: <LoginForm />
				},
				{
					path: "register",
					element: <RegisterForm />
				},
				{
					element: <ProtectedRoute />,
					children: [
						{
							path: "profile",
							element: <Profile />,
						},
					],	
				},
			],
		},
	]);

	useEffect(() => {
		if (localStorage.getItem("SMtheme") === "dark") {
			setMode("dark");
			document.documentElement.classList.add("dark");
		} else {
			setMode("light");
			document.documentElement.classList.remove("dark");
		}
	}, []);

	return (
		<AuthProvider>
			<AppContext.Provider
				value={{
					mode,
					toggleTheme,
					toggleSearchModal,
					isSearchModalOpened,
				}}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</AppContext.Provider>
		</AuthProvider>
	);
};

export default App;
