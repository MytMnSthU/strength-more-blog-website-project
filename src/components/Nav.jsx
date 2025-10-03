import { FaBars, FaSearch, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemedAppContext } from "../context/ThemedAppContext";

const NavLink = ({ route, title, toggleNavbar }) => {
	const { scrollToTop } = useContext(ThemedAppContext);	
	return (
		<li
			onClick={() => {
				toggleNavbar();
				scrollToTop();
			}}
			className=" mb-0 link">
			<Link to={route}>
				<span className=" uppercase text-base font-medium">{title}</span>
			</Link>
		</li>
	);
};

const NavBar = ({ isNavBarVisible, toggleNavbar }) => {
	const visibleNavbarStyle = ` ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] fixed top-0 left-0 z-30 lg:static lg:bg-transparent lg:flex-row lg:w-fit list-none ps-0 mb-0`;

	const hiddenNavbarStyle = `ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] fixed top-0 left-full z-30 lg:static lg:bg-transparent lg:flex-row lg:w-fit list-none ps-0 mb-0`;

	const { mode, toggleTheme } = useContext(ThemedAppContext);

	return (
		<ul className={isNavBarVisible ? visibleNavbarStyle : hiddenNavbarStyle}>
			<NavLink
				route="/articles/popular"
				title="popular articles"
				toggleNavbar={toggleNavbar}
			/>

			<NavLink
				route="/categories"
				title="categories"
				toggleNavbar={toggleNavbar}
			/>

			<li className="mb-0">
				<button
					className=" p-2.5 flex items-center gap-2"
					onClick={() => toggleTheme(mode)}>
					{mode === "light" ? (
						<div className="">
							<FaMoon size={14} />
						</div>
					) : (
						<div>
							<FaSun size={14} />
						</div>
					)}
				</button>
			</li>

			<button
				onClick={() => toggleNavbar()}
				type="button"
				className=" absolute top-0 right-0 p-3 block lg:hidden">
				<FaTimes className=" text-xl" />
			</button>
		</ul>
	);
};

const Nav = ({ toggleSearchModal }) => {
	const [isNavBarVisible, setIsNavBarVisible] = useState(false);

	const toggleNavbar = () => {
		setIsNavBarVisible(!isNavBarVisible);
	};

	return (
		<nav className="  border-b border-b-black dark:border-b-[#aaa] sticky top-0 left-0 w-full h-[54px] bg-[#F3F1E8] dark:bg-[#1F1F1F] z-20">
			<div className=" container flex items-center gap-5 p-2.5 mx-auto">
				<Link to="/">
					<Logo />
				</Link>

				<button
					onClick={toggleSearchModal}
					type="button"
					className=" ms-auto block lg:hidden">
					<FaSearch className=" text-xl" />
				</button>

				<button
					onClick={() => toggleNavbar()}
					type="button"
					className="block lg:hidden">
					<FaBars className=" text-xl" />
				</button>

				<NavBar
					isNavBarVisible={isNavBarVisible}
					toggleNavbar={toggleNavbar}
				/>
			</div>
		</nav>
	);
};

export default Nav;
