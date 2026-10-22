import { useNavigate } from "react-router";
import CategoryLabelList from "./CategoryLabelList";

const CategoriesBox = () => {
    const navigate = useNavigate();

    return (
        <div className=" relative">
            <div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F] border border-black/20 dark:border-[#fff]/20 rounded-lg relative z-10">
                <span
                    onClick={() => {
                        navigate("/categories");
                    }}
                    className=" text-xl font-semibold uppercase block p-4 cursor-pointer border-b border-black/20 dark:border-white/20 title"
                >
                    categories
                </span>
                <CategoryLabelList />
            </div>
        </div>
    );
};

export default CategoriesBox