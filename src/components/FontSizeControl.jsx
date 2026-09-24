import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";

const OPTIONS = [
	{ value: "small", label: "small", preview: "text-[0.75rem]" },
	{ value: "normal", label: "normal", preview: "text-sm" },
	{ value: "large", label: "large", preview: "text-lg" },
];

const FontSizeControl = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { fontSize, changeFontSize } = useContext(AppContext);
	const containerRef = useRef(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event) => {
			if (!containerRef.current?.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () =>
			document.removeEventListener("mousedown", handleOutsideClick);
	}, [isOpen]);

	return (
		<div
			ref={containerRef}
			className="relative mb-0 z-10"
			data-mobile-menu-item>
			<button
				type="button"
				aria-label="Adjust font size"
				aria-expanded={isOpen}
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-baseline gap-0 text-sm font-medium uppercase leading-none">
				<span className="font-bold">A</span>
				<span className=" text-[10px]">A</span>
			</button>

			{isOpen && (
				<div className="absolute left-1/2 top-full z-50 mt-3 min-w-32 -translate-x-1/2 rounded-lg border border-black/20 bg-[#F3F1E8] p-2 shadow-lg dark:border-white/20 dark:bg-[#1F1F1F]">
					{OPTIONS.map(({ value, label, preview }) => {
						const isActive = fontSize === value;
						return (
							<button
								key={value}
								type="button"
								onClick={() => {
									changeFontSize(value);
									setIsOpen(false);
								}}
								className={`flex w-full items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium uppercase hover:bg-black/5 dark:hover:bg-white/10 ${
									isActive
										? "bg-black text-white dark:bg-white dark:text-black hover:bg-black dark:hover:bg-white"
										: ""
								}`}>
								<span className={preview}>A</span>
								<span>{label}</span>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default FontSizeControl;
