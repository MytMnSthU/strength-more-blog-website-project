import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import { ThemedAppContext } from "./context/ThemedAppContext";

import ArticleDetail from "./components/ArticleDetail";
import ArticleList from "./components/ArticleList";
import CategoryList from "./components/CategoryList";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./MainLayout";

const queryClient = new QueryClient();

const App = () => {
	const scrollContainerRef = useRef(null);
	const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
	const [mode, setMode] = useState("light");

	const scrollToTop = () => {
		scrollContainerRef.current.scrollIntoView({
			block: "start",
		});
	};

	const toggleSearchModal = () => { 
		setIsSearchModalOpened(!isSearchModalOpened);
	}

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
	}

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
					element: <ArticleList title="Popular Articles" category="popular" />,
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
			],
		},
	]);

	useEffect(() => {
	  if (localStorage.getItem("SMtheme") === "dark") {
		setMode("dark");
		document.documentElement.classList.add("dark");
	  }
	  else {
		setMode("light");
		document.documentElement.classList.remove("dark");
	  }
	}, [])


	return (
		<ThemedAppContext.Provider value={{ scrollContainerRef, scrollToTop, mode, toggleTheme, toggleSearchModal, isSearchModalOpened }}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemedAppContext.Provider>
	);
};

export default App;
