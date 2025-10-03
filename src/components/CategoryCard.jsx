import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemedAppContext } from "../context/ThemedAppContext";



const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    const { scrollToTop } = useContext(ThemedAppContext);
	const [isImgLoaded, setIsImgLoaded] = useState(false);

    return (
        <div
            onClick={() => {
                navigate(`/categories/${category.slug}`);
                scrollToTop();
            }}
            className=" relative group  h-[140px] cursor-pointer"
        >
            <div className=" h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] p-2.5 border-2 border-black dark:border-[#aaa] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all relative z-10">
                <div className=" h-full border border-black dark:border-[#aaa] relative  overflow-hidden">
					{!isImgLoaded && (
						<div className=" absolute inset-0 flex items-center justify-center bg-[#F3F1E8] dark:bg-[#111] z-40">
							<span className=" text-gray-500 dark:text-[#aaa] uppercase">Loading...</span>
						</div>
					)}
                    <img
                        src={category.image.url}
                        className=" w-full h-full object-cover"
                        alt={category.image.url}
                        onLoad={() => setIsImgLoaded(true)}
                    />
                    <div className=" w-full h-full bg-black opacity-40 absolute z-20 top-0 left-0"></div>
                    <span className=" uppercase text-white text-4xl absolute bottom-3 left-3 z-30 title">
                        {category.name}
                    </span>
                </div>
            </div>
            <div className=" w-full h-full bg-black dark:bg-[#aaa]  absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

export default CategoryCard