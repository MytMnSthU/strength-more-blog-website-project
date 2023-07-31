import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ArticleBoxCard from "./ArticleBoxCard";




const SearchBar = ({ searchArticles }) => {
    const searchInputRef = useRef(null);
    const [searchedArticles, setSearchedArticles] = useState([]);
    const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
    // const searchedArticles = searchArticles(searchInputRef.current.value);

    return (
        <div
            onMouseEnter={() => setIsSearchInputFocus(true)}
            onMouseLeave={() => setIsSearchInputFocus(false)}
            className=" relative "
        >
            <form className=" bg-white rounded-[15px]  border-2 border-black relative z-10 translate-x-[-3px] translate-y-[-3px] focus-within:translate-x-0 focus-within:translate-y-0 transition-all">
                <div className="flex items-center gap-2.5 p-2.5">
                    <FaSearch />
                    <input
                        ref={searchInputRef}
                        onChange={() => {
                            const newSearchedArticles = searchArticles(
                                searchInputRef.current.value
                            );
                            setSearchedArticles(newSearchedArticles);
                        }}
                        onFocus={() => setIsSearchInputFocus(true)}
                        // onBlur={() => setIsSearchInputFocus(false)}
                        type="text"
                        className=" w-full focus:outline-none text-lg font-bold placeholder:text-sm placeholder:text-black placeholder:font-normal"
                        placeholder="SEARCH"
                    />
                </div>
                {isSearchInputFocus && searchInputRef.current.value && (
                    <div>
                        <hr className=" border-b-2 border-b-black" />
                        <span className=" block text-base font-bold uppercase p-2.5">
                            search result for '{searchInputRef.current?.value}'
                        </span>
                        {searchedArticles.length > 0 ? (
                            <div>
                                {searchedArticles.map((article) => (
                                    <ArticleBoxCard
                                        key={article.id}
                                        article={article}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>
                                <span className=" block text-base font-bold uppercase p-2.5 border-t-2 border-t-black">
                                    No result found.
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </form>
            <div className=" w-full h-full bg-black rounded-[15px] absolute top-0 left-0"></div>
        </div>
    );
};

export default SearchBar