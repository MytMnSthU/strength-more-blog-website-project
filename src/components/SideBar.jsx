import ArticlesBox from "./ArticlesBox";
import CategoriesBox from "./CategoriesBox";
import SearchBar from "./SearchBar";

const SideBar = ({onModalClick}) => {
    return (
        <div className=" hidden lg:flex flex-col gap-5 mt-12 ps-8 sticky top-3 h-screen z-[10]">
            <SearchBar onModalClick={onModalClick}  />
            <ArticlesBox
                boxTitle={"popular articles"}
            />
            <CategoriesBox />
        </div>
    );
};

export default SideBar

