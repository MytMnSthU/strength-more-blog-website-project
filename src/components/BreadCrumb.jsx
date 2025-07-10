import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }) => {
	if (!items || items.length === 0) return null;

	return (
		<nav aria-label="breadcrumb">
			<ul className=" flex items-start gap-2">
				{items.map((item, idx) => {
					const isLast = idx === items.length - 1;
					return (
						<li key={idx} className="flex items-center leading-tight">
							{item.to && !isLast ? (
								<Link to={item.to} style={{ textDecoration: "none", textDecoration: "underline", fontWeight: "bold", color: "#333" }}>
									{item.label}
								</Link>
							) : (
								<span style={isLast ? { fontWeight: "bold", color: "#333" } : {}}>
									{item.label}
								</span>
							)}
							{!isLast && (
								<span className=" ms-2 text-[12px]"><FaChevronRight /></span>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumb;