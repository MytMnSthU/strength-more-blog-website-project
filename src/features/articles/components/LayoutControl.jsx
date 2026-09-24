import { FaList, FaThLarge } from "react-icons/fa";

const OPTIONS = [
	{ value: "single", icon: FaList },
	{ value: "grid", icon: FaThLarge },
];

const LayoutControl = ({ layout, onChange }) => {
	return (
		<div className="hidden md:flex items-center gap-1 border border-black/20 dark:border-white/20 rounded-lg p-1 bg-transparent">
			{OPTIONS.map((option) => {
				const Icon = option.icon;
				const isActive = layout === option.value;
				return (
					<button
						key={option.value}
						type="button"
						onClick={() => onChange(option.value)}
						title={option.label}
						className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase leading-none transition-colors ${
							isActive
								? "bg-black text-white dark:bg-white dark:text-black"
								: "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10"
						}`}>
						<Icon className="text-[0.75rem]" />
					</button>
				);
			})}
		</div>
	);
};

export default LayoutControl;
