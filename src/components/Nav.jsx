import {
    FaBars,
    FaSearch,
    FaTimes,
    FaFacebookF,
    FaInstagram,
    FaTwitter
} from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ route, title, toggleNavbar }) => (
    <li onClick={() => toggleNavbar()}>
        <Link to={route}>
            <span className=" uppercase text-base font-medium">{title}</span>
        </Link>
    </li>
);

const NavBar = ({ isNavBarVisible, toggleNavbar }) => {
    const visibleNavbarStyle = ` ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-white absolute top-0 right-0 z-30 transition-all lg:static lg:bg-transparent lg:flex-row lg:w-fit`;

    const hiddenNavbarStyle = `ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-white absolute top-0 right-full z-30 transition-all lg:static lg:bg-transparent lg:flex-row lg:w-fit`;

    return (
        <ul
            className={isNavBarVisible ? visibleNavbarStyle : hiddenNavbarStyle}
        >
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

            <FaFacebookF className=" text-sm hidden lg:block" />

            <FaInstagram className=" hidden lg:block" />

            <FaTwitter className=" hidden lg:block" />

            <button
                onClick={() => toggleNavbar()}
                type="button"
                className=" absolute top-0 right-0 p-3 block lg:hidden"
            >
                <FaTimes className=" text-xl" />
            </button>
        </ul>
    );
};

const Nav = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    const toggleNavbar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <nav className="  border-b border-b-black">
            <div className=" container flex items-center gap-5 p-2.5 mx-auto">
                <Link to="/">
                    <Logo />
                </Link>

                <button type="button" className=" ms-auto block lg:hidden">
                    <FaSearch className=" text-xl" />
                </button>

                <button
                    onClick={() => toggleNavbar()}
                    type="button"
                    className="block lg:hidden"
                >
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
