import { useNavigate } from "react-router";
import CategoryLabel from "./CategoryLabel";



const CategoriesBox = ({ categories }) => {
    const navigate = useNavigate();

    return (
        <div className=" relative">
            <div className=" bg-[#F3F1E8] border-2 border-black relative z-10">
                <span
                    onClick={() => {
                        navigate("/categories");
                    }}
                    className=" text-xl font-semibold uppercase block p-4 cursor-pointer"
                >
                    categories
                </span>
                <hr className=" border-b-2 border-b-black" />
                <div className=" flex flex-wrap gap-2 p-4">
                    {categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
            </div>
            <div className=" w-full h-full bg-black absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

export default CategoriesBox