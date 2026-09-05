import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import ArticleSearchModal from "./features/articles/components/ArticleSearchModal";
import { AppContext } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";

const MainLayout = () => {
	const { scrollContainerRef, toggleSearchModal, isSearchModalOpened } = useContext(AppContext);
	return (
		<div
			ref={scrollContainerRef}
			className={`bg-[#F3F1E8] dark:bg-[#1F1F1F] text-black dark:text-white h-max border border-black min-h-screen`}>
			<ScrollToTop />
			<Nav toggleSearchModal={toggleSearchModal} />
			<div className="container grid lg:grid-cols-7 xl:grid-cols-7 gap-3 p-2.5 mx-auto sm:pb-20 ">
				<div className="sm:col-span-5 xl:col-span-5">
					<Outlet />
				</div>
				<div className=" sm:col-span-2">
					<SideBar onModalClick={toggleSearchModal} />
				</div>
				<ArticleSearchModal
					isOpen={isSearchModalOpened}
					onClose={toggleSearchModal}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;