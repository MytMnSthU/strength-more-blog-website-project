import { useNavigate } from "react-router";
import { ScrollTopContext } from "./ScrollTopContext";
import { useContext } from "react";




const CategoryLabel = ({ category }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);
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
                className=" px-5 py-2 border-2 border-black relative z-10 hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
                style={{ backgroundColor: category.color.hex }}
            >
                <span className=" text-sm uppercase font-semibold  block leading-none">
                    {category.name}
                </span>
            </div>
            <div className=" w-full h-full bg-black absolute top-0 left-0 z-0"></div>
        </div>
    );
};

export default CategoryLabel