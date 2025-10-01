import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemedAppContext } from "./context/ThemedAppContext";
import SearchModal from "./components/SearchModal";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

const MainLayout = () => {
	const { scrollContainerRef, toggleSearchModal, isSearchModalOpened } = useContext(ThemedAppContext);
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
				<SearchModal
					isOpen={isSearchModalOpened}
					onClose={toggleSearchModal}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;