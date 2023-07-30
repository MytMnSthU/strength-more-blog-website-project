import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    FaBars,
    FaClock,
    FaFacebookF,
    FaHeart,
    FaInstagram,
    FaSearch,
    FaTimes,
    FaTwitter,
    FaUserAlt,
} from "react-icons/fa";
import { createContext, isValidElement, useContext, useEffect, useRef, useState } from "react";
import request, { gql } from "graphql-request";
import PuffLoader from "react-spinners/PuffLoader";

const ScrollTopContext = createContext(null);

const Loader = () => {
    return (
        <div className=" w-full h-screen bg-[#F3F1E8] grid place-items-center">
            <PuffLoader />
        </div>
    );
};

const Logo = () => {
    return (
        <span className=" uppercase text-base font-extrabold">
            strength more
        </span>
    );
};

const NavLink = ({ route, title, toggleNavbar }) => {
    return (
        <li onClick={() => toggleNavbar()}>
            <Link to={route}>
                <span className=" uppercase text-base font-medium">
                    {title}
                </span>
            </Link>
        </li>
    );
};

const NavBar = ({ isNavBarVisible, toggleNavbar }) => {
    const visibleNavbarStyle = ` ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-white absolute top-0 right-0 z-30 transition-all lg:static lg:bg-transparent lg:flex-row lg:w-fit`;

    const hiddenNavbarStyle = `ms-auto flex flex-col justify-center items-center gap-5 w-full h-full bg-white absolute top-0 right-full z-30 transition-all lg:static lg:bg-transparent lg:flex-row lg:w-fit`;

    return (
        <ul
            className={isNavBarVisible ? visibleNavbarStyle : hiddenNavbarStyle}
        >
            <NavLink
                route="/articles/popular"
                title="popular articles"
                toggleNavbar={toggleNavbar}
            />

            <NavLink
                route="/categories"
                title="categories"
                toggleNavbar={toggleNavbar}
            />

            <FaFacebookF className=" text-sm hidden lg:block" />

            <FaInstagram className=" hidden lg:block" />

            <FaTwitter className=" hidden lg:block" />

            <button
                onClick={() => toggleNavbar()}
                type="button"
                className=" absolute top-0 right-0 p-3 block lg:hidden"
            >
                <FaTimes className=" text-xl" />
            </button>
        </ul>
    );
};

const Nav = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    const toggleNavbar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    return (
        <nav className="  border-b border-b-black">
            <div className=" container flex items-center gap-5 p-2.5 mx-auto">
                <Link to="/">
                    <Logo />
                </Link>

                <button type="button" className=" ms-auto block lg:hidden">
                    <FaSearch className=" text-xl" />
                </button>

                <button
                    onClick={() => toggleNavbar()}
                    type="button"
                    className="block lg:hidden"
                >
                    <FaBars className=" text-xl" />
                </button>

                <NavBar
                    isNavBarVisible={isNavBarVisible}
                    toggleNavbar={toggleNavbar}
                />
            </div>
        </nav>
    );
};

const LoadMoreButton = ({
    children,
    onClickBtn,
    isDisableBtn,
    btnLoading,
    setBtnLoading,
    type = "button",
}) => {
    return (
        <button
            onClick={() => {
                setBtnLoading(true);
                onClickBtn();
            }}
            type={type}
            disabled={isDisableBtn}
            className=" px-8 py-4 text-base font-bold uppercase text-white bg-black border-2 border-black rounded-[15px] leading-none mt-5 disabled:cursor-not-allowed"
        >
            {btnLoading ? <PuffLoader size={30} color="#ffffff" /> : children}
        </button>
    );
};

const SubmitCommentButton = ({submitComment}) => {
    return (
        <button onClick={submitComment} className=" px-8 py-4 text-base font-bold uppercase text-white bg-black border-2 border-black rounded-[15px] leading-none mt-5 disabled:cursor-not-allowed">
            Submit
        </button>
    );
};

const ResetButton = ({ type = "reset", children }) => {
    return (
        <button
            type={type}
            className=" px-8 py-4 text-base font-bold uppercase text-black bg-transparent border-2 mt-5 leading-none border-black rounded-[15px]"
        >
            {children}
        </button>
    );
};

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
                className=" rounded-full px-5 py-2 border-2 border-black relative z-10 hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
                style={{ backgroundColor: category.color.hex }}
            >
                <span className=" text-sm uppercase font-semibold  block leading-none">
                    {category.name}
                </span>
            </div>
            <div className=" w-full h-full rounded-full bg-black absolute top-0 left-0 z-0"></div>
        </div>
    );
};

const TimeLabel = ({ time }) => {
    return (
        <div className=" flex items-center gap-2">
            <FaClock className=" text-sm" />
            <span className=" text-sm font-semibold">{time}</span>
        </div>
    );
};

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);
    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" relative group cursor-pointer"
        >
            <div className=" bg-white h-full  grid gap-2.5 border-2 border-black rounded-[30px] p-2.5 pb-5 relative z-10 group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all">
                <div className=" h-[200px] border border-black rounded-[20px] overflow-hidden relative ">
                    <img
                        src={article.image.url}
                        className=" w-full h-full object-cover"
                        alt={article.image.url}
                    />

                    <div className=" flex absolute top-2 left-2 ">
                        {article.categories.map((category) => (
                            <CategoryLabel
                                key={category.id}
                                category={category}
                            />
                        ))}
                    </div>
                </div>

                <TimeLabel time={article.createdAt} />

                <h3 className=" text-2xl font-extrabold leading-none">
                    {article.title}
                </h3>
            </div>
            <div className=" w-full h-full bg-black rounded-[30px] absolute top-0 left-0 translate-x-[3px] translate-y-[3px] z-0"></div>
        </div>
    );
};

const CommentBox = ({ comment }) => {
    return (
        <div className=" flex items-start gap-3">
            <div className="w-fit relative">
                <div className=" rounded-full bg-white p-2 border border-black relative z-10">
                    <FaUserAlt />
                </div>
                <div className=" w-full h-full bg-black absolute rounded-full top-0 left-0 z-0 translate-x-[2px] translate-y-[2px]"></div>
            </div>

            <div className=" w-full relative">
                <div className=" bg-white rounded-[15px] border border-black p-2.5 grid gap-1 relative z-10">
                    <span className=" text-lg font-bold">
                        {comment.username}
                    </span>
                    <TimeLabel time={comment.createdAt} />
                    <p className=" text-xl px-3 font-medium mt-3">
                        {comment.title}
                    </p>
                </div>
                <div className=" w-full h-full bg-black rounded-[15px] absolute top-0 left-0 translate-x-1 translate-y-1"></div>
            </div>
        </div>
    );
};

const CommentForm = ({ articleId , fetchAndSetArticles }) => {
    const textRef = useRef(null);
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const checkEmpty = (target) => {
        return target.trim().length > 0;
    };

    const isEmailFormat = (target) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(target)
    }

    // console.log('valid?',isEmailFormat('aaaa'));

    const postData = async (title,  username, email, articleId) => {
        const endpoint = import.meta.env.VITE_REACT_APP_API_KEY;

        const createCommentQuery = gql`
            mutation CreateComment(
                $id: ID,
                $email: String,
                $title: String,
                $username: String
            ) {
                createComment(
                    data: {
                        clknsvk8e0s6j01uccy366fql: { connect: { id: $id } }
                        email: $email
                        title: $title
                        username: $username
                    }
                ) {
                    id
                }
            }
        `;

        const publishCommentQuery = gql`
            mutation PublishComment($createdCommentId:ID) {
                publishComment(
                    where: { id: $createdCommentId }
                    to: PUBLISHED
                ) {
                    createdAt
                    id
                    title
                    username
                }
            }
        `;

        const createCommentVariables = {
            email,
            username,
            title,
            id: articleId,
        };

        const { createComment } = await request(
            endpoint,
            createCommentQuery,
            createCommentVariables
        );

        const data = await request(endpoint, publishCommentQuery, {
            createdCommentId: createComment.id,
        });
        console.log("Comments", data);

        await fetchAndSetArticles();
    };

    const submitFormComment = () => {
        const title = textRef?.current.value;
        const username = nameInputRef?.current.value;
        const email = emailInputRef?.current.value;

        if (checkEmpty(title) && checkEmpty(username) && checkEmpty(email)) {

            if(isEmailFormat(email)){
                postData(title, username, email, articleId);
            }else{
                alert("Invalid email format");
            }
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // submitFormComment();
            }}
            className=" grid gap-3"
        >
            <textarea
                ref={textRef}
                rows="4"
                className=" w-full p-2 px-4 text-lg font-bold  rounded-[20px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Some text here..."
            ></textarea>

            <input
                ref={nameInputRef}
                type="text"
                className="w-full p-2  px-4 text-lg font-bold rounded-[15px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Name"
            />

            <input
                ref={emailInputRef}
                type="email"
                className="w-full p-2  px-4 text-lg font-bold rounded-[15px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Email"
            />

            <div className=" flex justify-end gap-5 items-center">
                <ResetButton>Cancel</ResetButton>
                <SubmitCommentButton
                    submitComment={(e) => {
                        e.preventDefault();
                        submitFormComment();
                    }}
                >
                    submit
                </SubmitCommentButton>
            </div>
        </form>
    );
};

const ArticleDetail = ({ articles, fetchAndSetArticles }) => {
    const contentRef = useRef(null);
    const { articleId } = useParams();
    // const [Comments, setComments] = useState([]);

    const currentArticle = articles.filter(
        (article) => article.slug === articleId
    )[0];

    useEffect(() => {
        contentRef.current.innerHTML = currentArticle.content.html;
    }, [contentRef, articleId]);

    return (
        <div className=" grid gap-2.5 p-2.5 lg:pt-10">
            <div className=" h-[200px] sm:h-[400px] rounded-[20px] border-2 border-black overflow-hidden relative">
                <img
                    src={currentArticle.image.url}
                    className=" w-full h-full object-cover"
                    alt={currentArticle.image.url}
                />

                <div className=" flex absolute top-2 left-2 ">
                    {currentArticle.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
            </div>

            <TimeLabel time={currentArticle.createdAt} />

            <h1 className=" text-3xl md:text-4xl font-extrabold leading-none mb-3">
                {currentArticle.title}
            </h1>

            <div ref={contentRef}></div>

            <h4 className=" text-2xl font-extrabold">Comments</h4>

            <div className=" grid gap-5 mb-10   ">
                {currentArticle.comments.length === 0 ? (
                    <div>
                        <span className=" text-lg">No comment.</span>
                    </div>
                ) : (
                    currentArticle.comments.map((comment) => (
                        <CommentBox key={comment.id} comment={comment} />
                    ))
                )}
            </div>

            <div>
                <h4 className=" text-2xl font-extrabold mb-4">Leave Comment</h4>
                <CommentForm articleId={currentArticle.id} fetchAndSetArticles={fetchAndSetArticles} />
            </div>
        </div>
    );
};

const ArticleBoxCard = ({ article }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" cursor-pointer"
        >
            <hr className=" border-b-2 border-b-black" />
            <div className=" p-4 grid gap-2.5">
                <div className=" flex">
                    {article.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
                <h4 className=" text-2xl font-bold leading-none">
                    {article.title}
                </h4>
                <TimeLabel time={article.createdAt} />
            </div>
        </div>
    );
};

const ArticlesBox = ({ boxTitle, articles }) => {
    const navigate = useNavigate();
    return (
        <div className=" relative">
            <div className=" bg-white border-2 border-black rounded-[20px] relative z-10">
                <span
                    onClick={() => {
                        navigate("/articles/popular");
                    }}
                    className=" text-xl font-semibold uppercase block p-4"
                >
                    {boxTitle}
                </span>

                <div>
                    {articles.map((article) => (
                        <ArticleBoxCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
            <div className=" w-full h-full bg-black rounded-[20px] absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

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

const CategoriesBox = ({ categories }) => {
    const navigate = useNavigate();

    return (
        <div className=" relative">
            <div className=" bg-white border-2 border-black rounded-[20px] relative z-10">
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
            <div className=" w-full h-full bg-black rounded-[20px] absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

const SideBar = ({ categories, popularArticles, searchArticles }) => {
    return (
        <div className=" hidden lg:flex flex-col gap-5 mt-12 px-8">
            <SearchBar searchArticles={searchArticles} />
            <CategoriesBox categories={categories} />
            <ArticlesBox
                boxTitle={"popular articles"}
                articles={popularArticles}
            />
        </div>
    );
};

const ArticleList = ({
    title,
    articles,
    moreBlog,
    isDisable,
    loading,
    btnLoading,
    setBtnLoading,
}) => {
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="grid gap-2.5">
                    <h3 className=" text-2xl font-extrabold">{title}</h3>
                    <div className=" grid sm:grid-cols-2 gap-5">
                        {articles.length > 0 &&
                            articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                    </div>
                    {title.toLowerCase() === "recent articles" && (
                        <div className="flex justify-center items-center">
                            <LoadMoreButton
                                onClickBtn={moreBlog}
                                isDisableBtn={isDisable}
                                btnLoading={btnLoading}
                                setBtnLoading={setBtnLoading}
                            >
                                more blog
                            </LoadMoreButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const FilterArticleList = ({ articles }) => {
    const { categoryId } = useParams();

    const filterArticles = articles.filter((article) =>
        article.categories.find((category) => category.slug === categoryId)
    );

    // console.log(filterArticles);

    return (
        <ArticleList
            title={`Category '${categoryId}'`}
            articles={filterArticles}
        />
    );
};

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
            <div className=" h-full bg-white p-2.5 border-2 border-black rounded-[30px] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all relative z-10">
                <div className=" h-full border border-black rounded-[20px] relative  overflow-hidden">
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
            <div className=" w-full h-full rounded-[30px] bg-black  absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

const CategoryList = ({ categories }) => {
    return (
        <div>
            <h3 className=" text-2xl font-extrabold mb-4">Categories</h3>
            <div className="grid sm:grid-cols-2 gap-5">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

const Footer = ({ categories }) => {
    return (
        <footer className=" border-t border-black">
            <div className=" container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 my-5 p-2.5 sm:my-10">
                <div className="  sm:row-span-2">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Placeat in laboriosam, voluptatem eaque neque
                        deserunt voluptates expedita debitis rerum modi quos
                        corporis architecto repellendus, dolorum id similique a
                        nam alias!
                    </p>
                </div>

                <div>
                    <span className=" uppercase text-base font-semibold">
                        categories
                    </span>

                    <hr className=" border-b border-b-black my-2" />

                    <div className=" flex flex-wrap gap-2 mb-2.5">
                        {categories.map((category) => (
                            <CategoryLabel
                                key={category.id}
                                category={category}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <span className=" uppercase text-base font-semibold">
                        social links
                    </span>

                    <hr className=" border-b border-b-black my-2" />

                    <a href="#" className=" text-base  font-bold uppercase">
                        facebook
                    </a>

                    <hr className=" border-b border-b-black my-2" />
                    <a href="#" className=" text-base  font-bold uppercase">
                        instagram
                    </a>

                    <hr className=" border-b border-b-black my-2" />
                    <a href="#" className=" text-base  font-bold uppercase">
                        twitter
                    </a>

                    {/* <hr className=" border-b border-b-black my-2" /> */}
                </div>
            </div>
            <div className="sm:col-span-2 border-t border-t-black mb-5 sm:mb-0">
                <span className=" flex justify-center items-center gap-1 text-sm py-3">
                    Made with <FaHeart />
                    by<a href="https://github.com/MytMnSthU">Myat</a>
                </span>
            </div>
        </footer>
    );
};

const App = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentArticlesCount, setCurrentArticlesCount] = useState(8);
    const [maxArticlesCount, setMaxArticlesCount] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [docLoading, setDocLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    const scrollContainerRef = useRef(null);

    const popularArticles = articles?.filter(
        (article) => article.popularArticle === true
    );

    const defaultGetQuery = gql`
        query GetArticles {
            articles(orderBy: publishedAt_DESC, first: ${currentArticlesCount}) {
                id
                title
                slug
                image {
                    url
                }
                createdAt
                categories {
                    id
                    color {
                        hex
                    }
                    name
                    slug
                }
                content {
                    html
                }
                popularArticle
                comments {
                    email
                    title
                    username
                    id
                    createdAt
                  }
            }
        }
    `;

    const getCategoriesQuery = gql`
        query GetCategories {
            categories(orderBy: name_ASC) {
                id
                name
                image {
                    url
                }
                slug
                color {
                    hex
                }
            }
        }
    `;

    const fetchData = async (query = defaultGetQuery) => {
        const endpoint = import.meta.env.VITE_REACT_APP_API_KEY;

        const data = await request(endpoint, query);

        return data;
    };

    const fetchAndSetArticles = async (query) => {
        const data = await fetchData(query);

        const fetchedArticles = data.articles;

        const formattedArticles = fetchedArticles.map((article) => {
            const newArticle = {
                ...article,
                createdAt: formatDate(article.createdAt),
                comments: article.comments.map((comment) => {
                    const newComment = {
                        ...comment,
                        createdAt: formatDate(comment.createdAt),
                    };
                    return newComment;
                }),
            };

            return newArticle;
        });

        // console.log('format',formattedArticles);
        // sortByDesc(formattedArticles);
        // console.log(formattedArticles);
        console.log(formattedArticles);

        setArticles(formattedArticles);
        setLoading(false);
        setBtnLoading(false);
    };

    const fetchAndSetCategories = async (query) => {
        const data = await fetchData(query);

        const fetchedCategories = data.categories;

        setCategories(fetchedCategories);
    };

    const formatDate = (date) => {
        const newDate = new Date(date);

        const month = newDate.toLocaleDateString("en-US", { month: "short" });

        const day = newDate.getDate();

        const year = newDate.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;

        return formattedDate;
    };

    const sortByDesc = (items) => {
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const searchArticles = (searchTerm) => {
        const searchedArticles = articles.filter((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return searchedArticles;
    };

    const fetchAndSetArticlesTotal = async () => {
        const getArticlesTotalQuery = gql`
            query GetArticlesTotal {
                articlesConnection(stage: PUBLISHED) {
                    aggregate {
                        count
                    }
                }
            }
        `;

        const data = await fetchData(getArticlesTotalQuery);
        const newMaxArticlesCount = data.articlesConnection.aggregate.count;
        setMaxArticlesCount(newMaxArticlesCount);
    };

    const moreBlog = () => {
        // console.log(maxArticlesCount, currentArticlesCount);
        let newTotal = currentArticlesCount + 2;
        setCurrentArticlesCount(newTotal);
        // fetchAndSetArticles();

        if (maxArticlesCount === currentArticlesCount + 2) {
            setIsDisable(true);
        }
    };

    const scrollToTop = () => {
        scrollContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setDocLoading(false);
        }, 1000);

        fetchAndSetArticles();
        fetchAndSetCategories(getCategoriesQuery);
        fetchAndSetArticlesTotal();

        // console.log(articles);
    }, [currentArticlesCount]);

    return (
        <BrowserRouter>
            <ScrollTopContext.Provider value={scrollToTop}>
                {docLoading ? (
                    <Loader />
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="bg-[#F3F1E8] h-max border border-black"
                    >
                        <Nav />

                        <div className="container grid lg:grid-cols-3  gap-5 p-2.5 mx-auto sm:pb-20">
                            <div className=" sm:col-span-2">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <ArticleList
                                                title="Recent Articles"
                                                articles={articles}
                                                moreBlog={moreBlog}
                                                isDisable={isDisable}
                                                loading={loading}
                                                btnLoading={btnLoading}
                                                setBtnLoading={setBtnLoading}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/articles/:articleId"
                                        element={
                                            <ArticleDetail
                                                articles={articles}
                                                fetchAndSetArticles={fetchAndSetArticles}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/articles/popular"
                                        element={
                                            <ArticleList
                                                title="Popular Articles"
                                                articles={popularArticles}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/categories/:categoryId"
                                        element={
                                            <FilterArticleList
                                                articles={articles}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/categories"
                                        element={
                                            <CategoryList
                                                categories={categories}
                                            />
                                        }
                                    />
                                </Routes>
                            </div>

                            <SideBar
                                categories={categories}
                                popularArticles={popularArticles}
                                searchArticles={searchArticles}
                            />
                        </div>

                        <Footer categories={categories} />
                    </div>
                )}
            </ScrollTopContext.Provider>
        </BrowserRouter>
    );
};

export default App;
