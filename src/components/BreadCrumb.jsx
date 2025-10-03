import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }) => {
	if (!items || items.length === 0) return null;

	return (
		<nav aria-label="breadcrumb">
			<ul className=" flex items-start gap-2 list-none p-0 m-0">
				{items.map((item, idx) => {
					const isLast = idx === items.length - 1;
					return (
						<li key={idx} className="flex items-center leading-tight text-sm mb-0">
							{item.to && !isLast ? (
								<Link
									to={item.to}
									className="underline font-bold text-zinc-800 dark:text-zinc-200"
								>
									{item.label}
								</Link>
							) : (
								<span className={isLast ? "font-bold text-zinc-800 dark:text-zinc-200" : ""}>
									{item.label}
								</span>
							)}
							{!isLast && (
								<span className="ms-2 text-xs">
									<FaAngleRight />
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumb;