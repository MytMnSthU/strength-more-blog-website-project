import ArticlesBox from "./ArticlesBox";
import CategoriesBox from "./CategoriesBox";
// import SearchBar from "./SearchBar";

const SideBar = () => {
    return (
        <div className=" hidden lg:flex flex-col gap-5 mt-12 ps-8 sticky top-3 h-screen">
            {/* <SearchBar  /> */}
            <ArticlesBox
                boxTitle={"popular articles"}
            />
            <CategoriesBox />
        </div>
    );
};

export default SideBar

