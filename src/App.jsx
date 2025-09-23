import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { ThemedAppContext } from "./context/ThemedAppContext";

import Nav from "./components/Nav";
import ArticleDetail from "./components/ArticleDetail";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchModal from "./components/SearchModal";

const queryClient = new QueryClient();

const App = () => {
	const scrollContainerRef = useRef(null);
	const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
	const [mode, setMode] = useState("light");

	const searchArticles = (searchTerm) => {
		const searchedArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
		return searchedArticles;
	};

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
		} else {
			setMode("light");
			document.documentElement.classList.remove("dark");
		}
	}

	// Layout component for main content
	const MainLayout = () => {
		return (
			<div
				ref={scrollContainerRef}
				className={`bg-[#F3F1E8] dark:bg-[#1F1F1F] text-black dark:text-white h-max border border-black`}>
				<Nav toggleSearchModal={toggleSearchModal} />
				<div className="container grid lg:grid-cols-3 gap-5 p-2.5 mx-auto sm:pb-20 ">
					<div className="sm:col-span-2">
						<Outlet />
					</div>
					<SideBar onModalClick={toggleSearchModal} />
					<SearchModal isOpen={isSearchModalOpened} onClose={toggleSearchModal} />
				</div>
				<Footer />
			</div>
		);
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

	return (
		<ThemedAppContext.Provider value={{ scrollToTop, mode, toggleTheme }}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemedAppContext.Provider>
	);
};

export default App;
