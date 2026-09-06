import { animate, stagger } from "animejs";
import { FaBars, FaSearch, FaTimes, FaMoon, FaSun, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const menuItems = [
	{ route: "/articles/popular", title: "popular articles" },
	{ route: "/categories", title: "categories" },
];

const ProfileMenu = () => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	return (
		<div className="relative" data-mobile-menu-item>
			<button
				type="button"
				aria-label="Open demo profile menu"
				aria-expanded={isProfileMenuOpen}
				onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
				className="flex items-center gap-2 text-sm font-medium uppercase leading-none">
				<img
					src="/logo.jpg"
					alt="demo profile"
					className="h-6 w-6 rounded-full object-cover"
				/>
				<FaUser size={13} />
				<span>demo</span>
			</button>

			{isProfileMenuOpen && (
				<div className="absolute left-1/2 top-full z-50 mt-3 min-w-40 -translate-x-1/2 border border-black/20 bg-[#F3F1E8] p-2 shadow-lg dark:border-white/20 dark:bg-[#1F1F1F] rounded-lg">
					<Link
						to="/profile"
						className="block whitespace-nowrap px-3 py-2 text-sm font-medium uppercase hover:bg-black/5 dark:hover:bg-white/10 rounded-sm">
						view profile
					</Link>
					<button
						type="button"
						className="block w-full whitespace-nowrap px-3 py-2 text-left text-sm font-medium uppercase hover:bg-black/5 dark:hover:bg-white/10 rounded-sm">
						logout
					</button>
				</div>
			)}
		</div>
	);
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { mode, toggleTheme, toggleSearchModal } = useContext(AppContext);
	const mobileMenuRef = useRef(null);
	const menuItemsRef = useRef(null);
	const menuIconRef = useRef(null);

	useEffect(() => {
		if (!window.matchMedia("(max-width: 1023px)").matches) return;

		animate(mobileMenuRef.current, {
			translateX: isMenuOpen ? ["100%", "0%"] : ["0%", "100%"],
			opacity: isMenuOpen ? [0, 1] : [1, 0],
			duration: 280,
			ease: "out(2.4)",
		});

		if (isMenuOpen) {
			animate(menuItemsRef.current?.children, {
				translateY: [12, 0],
				opacity: [0, 1],
				duration: 220,
				delay: stagger(60, { start: 80 }),
				ease: "out(2.4)",
			});
		}

		animate(menuIconRef.current, {
			rotate: isMenuOpen ? 90 : 0,
			duration: 200,
			ease: "out(2.4)",
		});
	}, [isMenuOpen]);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="fixed top-0 z-50 w-full border-b border-black/20 bg-[#F3F1E8] dark:border-white/20 dark:bg-[#1F1F1F]">
			<nav className="container mx-auto flex items-center justify-between px-2 py-2">
				<Link
					to="/"
					onClick={closeMenu}>
					<Logo />
				</Link>

				<button
					type="button"
					aria-label={
						isMenuOpen
							? "Close navigation menu"
							: "Open navigation menu"
					}
					aria-expanded={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="relative z-50 block p-1 lg:hidden">
					<span
						ref={menuIconRef}
						className="block">
						{isMenuOpen ? (
							<FaTimes className="text-xl" />
						) : (
							<FaBars className="text-xl" />
						)}
					</span>
				</button>

				<div
					ref={mobileMenuRef}
					className={`fixed inset-0 flex flex-col items-center justify-center gap-5 bg-[#F3F1E8] dark:bg-[#1F1F1F] lg:hidden ${isMenuOpen ? "" : "translate-x-full opacity-0"}`}>
					<div
						ref={menuItemsRef}
						className="contents">
						{menuItems.map(({ route, title }) => (
							<div
								key={route}
								data-mobile-menu-item
								className="mb-0">
								<Link
									to={route}
									onClick={closeMenu}>
									<span className="uppercase text-sm font-medium leading-none">
										{title}
									</span>
								</Link>
							</div>
						))}

						<button
							type="button"
							aria-label="Search articles"
							data-mobile-menu-item
							onClick={() => {
								toggleSearchModal();
							}}
							className="mb-0">
							<FaSearch className="text-[14px]" />
						</button>

						<button
							type="button"
							aria-label="Toggle color theme"
							data-mobile-menu-item
							onClick={() => toggleTheme(mode)}
							className="mb-0 flex items-center gap-2">
							{mode === "light" ? (
								<FaMoon size={13} />
							) : (
								<FaSun size={13} />
							)}
						</button>

						<Link
							to="/login"
							onClick={closeMenu}
							data-mobile-menu-item
							className="uppercase text-sm font-medium leading-none">
							login
						</Link>
						<ProfileMenu />
					</div>
				</div>

				<div className=" hidden items-center gap-5 lg:flex">
					{menuItems.map(({ route, title }) => (
						<Link
							key={route}
							to={route}>
							<span className="uppercase text-sm font-medium leading-none">
								{title}
							</span>
						</Link>
					))}
					<button
						type="button"
						aria-label="Search articles"
						onClick={toggleSearchModal}>
						<FaSearch size={13} />
					</button>
					<button
						type="button"
						aria-label="Toggle color theme"
						className=" p-1"
						onClick={() => toggleTheme(mode)}>
						{mode === "light" ? (
							<FaMoon size={13} />
						) : (
							<FaSun size={13} />
						)}
					</button>
					<Link
						to="/login"
						className="uppercase text-sm font-medium">
						login
					</Link>
					<ProfileMenu />
				</div>
			</nav>
		</header>
	);
};

export default Header;
