import ArticlesBox from "./ArticlesBox";
import CategoriesBox from "./CategoriesBox";
import SearchBar from "./SearchBar";

const SideBar = ({ categories, popularArticles, searchArticles }) => {
    return (
        <div className=" hidden lg:flex flex-col gap-5 mt-12 px-8 sticky top-3 h-screen">
            <SearchBar searchArticles={searchArticles} />
            <CategoriesBox categories={categories} />
            <ArticlesBox
                boxTitle={"popular articles"}
                articles={popularArticles}
            />
        </div>
    );
};

export default SideBar

