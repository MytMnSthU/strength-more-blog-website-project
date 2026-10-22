import { FaBars, FaSearch, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavLink = ({ route, title, toggleNavbar }) => {
	return (
		<li
			onClick={() => {
				toggleNavbar();
			}}
			className=" mb-0 link flex items-center">
			<Link to={route}>
				<span className=" uppercase text-sm font-medium leading-none">
					{title}
				</span>
			</Link>
		</li>
	);
};

const NavBar = ({ isNavBarVisible, toggleNavbar, toggleSearchModal }) => {
	const visibleNavbarStyle = ` ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] fixed top-0 left-0 z-30 lg:static lg:bg-transparent lg:flex-row lg:w-fit list-none ps-0 mb-0`;

	const hiddenNavbarStyle = `ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] fixed top-0 left-full z-30 lg:static lg:bg-transparent lg:flex-row lg:w-fit list-none ps-0 mb-0`;

	const { mode, toggleTheme } = useContext(AppContext);

	return (
		<ul
			className={
				isNavBarVisible ? visibleNavbarStyle : hiddenNavbarStyle
			}>
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

			<li className=" mb-0">
				<button
					onClick={toggleSearchModal}
					type="button"
					className=" block  ">
					<FaSearch className=" text-[14px]" />
				</button>
			</li>

			<li className="mb-0">
				<button
					className="  flex items-center gap-2"
					onClick={() => toggleTheme(mode)}>
					{mode === "light" ? (
						<div className="">
							<FaMoon size={13} />
						</div>
					) : (
						<div>
							<FaSun size={13} />
						</div>
					)}
				</button>
			</li>

			<button>
				<span>login</span>
			</button>

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
		<nav className=" sticky top-0 left-0 w-full h-[54px] bg-[#F3F1E8] dark:bg-[#1F1F1F] z-20 border-black/20 dark:border-white/20 border-b">
			<div className=" container flex justify-between items-center gap-5 p-2.5 mx-auto">
				<Link to="/">
					<Logo />
				</Link>

				<button
					onClick={() => toggleNavbar()}
					type="button"
					className="block lg:hidden">
					<FaBars className=" text-xl" />
				</button>

				<NavBar
					isNavBarVisible={isNavBarVisible}
					toggleNavbar={toggleNavbar}
					toggleSearchModal={toggleSearchModal}
				/>
			</div>
		</nav>
	);
};

export default Nav;
