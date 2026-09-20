import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import ArticleSearchModal from "./features/articles/components/ArticleSearchModal";
import { AppContext } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

const MainLayout = () => {
	const { scrollContainerRef, toggleSearchModal, isSearchModalOpened } = useContext(AppContext);
	return (
		<div
			ref={scrollContainerRef}
			className={`bg-[#F3F1E8] dark:bg-[#1F1F1F] text-black dark:text-white h-max border border-black min-h-screen`}>
			<ScrollToTop />
			<Header toggleSearchModal={toggleSearchModal} />
			<div className="container grid lg:grid-cols-8 xl:grid-cols-8 gap-3 p-2.5 mx-auto sm:pb-20  pt-14">
				<div className="sm:col-span-6 xl:col-span-6">
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