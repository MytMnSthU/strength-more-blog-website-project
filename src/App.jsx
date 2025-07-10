import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import request, { gql } from "graphql-request";

import { ScrollTopContext } from "./components/ScrollTopContext";

import Nav from "./components/Nav";
import Loader from "./components/Loader";
import ArticleDetail from "./components/ArticleDetail";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import FilterArticleList from "./components/FilterArticleList";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";

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
        try {
            const endpoint = import.meta.env.VITE_API_KEY;

            const data = await request(endpoint, query);

            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAndSetArticles = async (query) => {
        try {
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

            setArticles(formattedArticles);
            setLoading(false);
            setBtnLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAndSetCategories = async (query) => {
        try {
            const data = await fetchData(query);

            const fetchedCategories = data.categories;

            setCategories(fetchedCategories);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (date) => {
        const newDate = new Date(date);

        const month = newDate.toLocaleDateString("en-US", { month: "short" });

        const day = newDate.getDate();

        const year = newDate.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;

        return formattedDate;
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
        let newTotal = currentArticlesCount + 4;
        setCurrentArticlesCount(newTotal);

        if (maxArticlesCount === currentArticlesCount + 4) {
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

                        <div className=" container grid lg:grid-cols-3  gap-5 p-2.5 mx-auto sm:pb-20">
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
                                                fetchAndSetArticles={
                                                    fetchAndSetArticles
                                                }
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
