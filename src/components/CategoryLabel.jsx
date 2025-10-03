import { useNavigate } from "react-router";
import { ThemedAppContext } from "../context/ThemedAppContext";
import { useContext } from "react";




const CategoryLabel = ({ category }) => {
    const navigate = useNavigate();
	const { scrollToTop } = useContext(ThemedAppContext);
	
    return (
        <div
            onClick={(e) => {
                navigate(`/categories/${category.slug}`);
                scrollToTop();
                e.stopPropagation();
            }}
            className=" relative group cursor-pointer"
        >
            <div
                className=" px-5 py-2 border-2 border-black dark:border-white dark:text-black relative z-10 hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
                style={{ backgroundColor: category.color.hex }}
            >
                <span className=" text-sm uppercase font-semibold  block leading-none label">
                    {category.name}
                </span>
            </div>
            <div className=" w-full h-full bg-black dark:bg-[#fff] absolute top-0 left-0 z-0"></div>
        </div>
    );
};

export default CategoryLabel