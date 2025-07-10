import { useContext } from "react";
import { useNavigate } from "react-router";
import { ScrollTopContext } from "./ScrollTopContext";



const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);
    return (
        <div
            onClick={() => {
                navigate(`/categories/${category.slug}`);
                scrollToTop();
            }}
            className=" relative group"
        >
            <div className=" h-full bg-[#F3F1E8] p-2.5 border-2 border-black group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all relative z-10">
                <div className=" h-full border border-black relative  overflow-hidden">
                    <img
                        src={category.image.url}
                        className=" w-full h-full object-cover"
                        alt={category.image.url}
                    />
                    <div className=" w-full h-full bg-black opacity-40 absolute z-20 top-0 left-0"></div>
                    <span className=" uppercase text-white text-4xl absolute bottom-3 left-3 z-30">
                        {category.name}
                    </span>
                </div>
            </div>
            <div className=" w-full h-full bg-black  absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

export default CategoryCard