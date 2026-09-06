import ArticlesBox from "../features/articles/components/ArticlesBox";
import CategoriesBox from "@/features/categories/components/CategoriesBox";

const SideBar = () => {
    return (
        <div className=" hidden lg:flex flex-col gap-3  sticky top-16 h-screen z-[10] ">
            <ArticlesBox
                boxTitle={"popular articles"}
            />
            <CategoriesBox />
        </div>
    );
};

export default SideBar

