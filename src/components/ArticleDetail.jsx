import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import TimeLabel from "./TimeLabel";
import CategoryLabel from "./CategoryLabel";
import BreadCrumb from "./BreadCrumb";
import { request } from "graphql-request";
import Loader from "./Loader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ARTICLE, TOGGLE_LIKE_MUTATION } from "../graphql/query"; 
import { formatNumber } from "../utils/utils";
import { FaHeart, FaRegHeart, FaShare, FaEye } from "react-icons/fa";
import ShareModal from "./ShareModal";


const ArticleDetail = () => {
    const contentRef = useRef(null);
    const { articleId } = useParams();
    const [isLiked, setIsLiked] = useState(false);
	const [isShareModalOpened, setIsShareModalOpened] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["article", articleId],
        queryFn: async () => {
            return await request(import.meta.env.VITE_API_KEY, GET_ARTICLE, { articleId: articleId });
        },
    });

    useEffect(() => {
        if (data?.article) {
            contentRef.current.innerHTML = data.article.content.html;
        }
    }, [data, articleId]); 

    const likeMutation = useMutation({
        mutationFn: ({ slug, likes }) => {
            return request(import.meta.env.VITE_API_KEY, TOGGLE_LIKE_MUTATION, {
                slug,
                likes,
            });
        },
        onMutate: async ({ likes: newLikes }) => {
            await queryClient.cancelQueries({ queryKey: ["article", articleId] });
            const previousArticleData = queryClient.getQueryData(["article", articleId]);
            queryClient.setQueryData(["article", articleId], (oldData) => ({
                ...oldData,
                article: {
                    ...oldData.article,
                    likes: newLikes,
                },
            }));
            return { previousArticleData };
        },
        onError: (err, variables, context) => {
            if (context?.previousArticleData) {
                queryClient.setQueryData(["article", articleId], context.previousArticleData);
            }
            setIsLiked((prev) => !prev); // Revert icon on error
        },
    });
   
    const handleToggleLike = () => {
        if (!data?.article || likeMutation.isPending) return;
		
        const currentLikes = Number(data.article.likes) || 0;
        const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

        setIsLiked((prev) => !prev);
        likeMutation.mutate({ slug: articleId, likes: newLikes });
    };

    if (error) {
        console.error("Error fetching article:", error);
        return <div>Error loading article</div>;
    }

    if (isLoading) return <Loader />;

    if (!data?.article) {
        return <div>No article found</div>;
    }

    const formattedArticle = {
        ...data.article,
        createdAt: new Date(data.article.createdAt).toLocaleDateString(),
    };

    const breadCrumbItems = [{ label: "Home", to: "/" }, { label: formattedArticle.title }];

    return (
        <div className="flex sm:flex-row-reverse flex-col gap-5">
            <div className="grid gap-2.5 flex-1">
                <BreadCrumb items={breadCrumbItems} />

                <h1 className="text-3xl md:text-4xl font-extrabold leading-none mt-5">{formattedArticle.title}</h1>
                <TimeLabel time={formattedArticle.createdAt} />

                <div className="w-full h-[200px] sm:h-[400px] border-2 border-black dark:border-[#aaa] overflow-hidden relative mt-2.5">
                    <img
                        src={formattedArticle.image.url}
                        className="w-full h-full object-cover"
                        alt={formattedArticle.image.url}
                    />
                    <div className="flex gap-2 absolute top-2 left-2">
                        {formattedArticle.categories.map((category) => (
                            <CategoryLabel key={category.id} category={category} />
                        ))}
                    </div>
                </div>

                <div ref={contentRef} className="prose dark:prose-invert max-w-none mt-4"></div>
            </div>

            <div className="h-fit static sm:sticky top-1/2 left-0 transform sm:-translate-y-1/2 z-10">
                <div className="sm:w-[80px] bg-[#F3F1E8] dark:bg-[#1F1F1F] border-2 border-black dark:border-[#aaa] relative z-10 p-2.5">
                    <div className="flex sm:flex-col justify-evenly items-center">
                        <div
                            onClick={handleToggleLike}
                            className={`flex flex-col justify-center items-center p-4 transition-colors ${
                                likeMutation.isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            }`}
                        >
                            {isLiked ? (
                                <div className="text-center text-red-500 hover:text-red-600">
                                    <FaHeart className="text-lg mx-auto" />
                                    <span className="text-sm font-bold">{formatNumber(formattedArticle.likes)}</span>
                                </div>
                            ) : (
                                <div className="text-center hover:text-red-500">
                                    <FaRegHeart className="text-lg mx-auto" />
                                    <span className="text-sm font-bold">{formatNumber(formattedArticle.likes)}</span>
                                </div>
                            )}
                        </div>

                        <div onClick={() => setIsShareModalOpened(true)} className="flex flex-col justify-center items-center p-4 cursor-pointer hover:text-blue-500 transition-colors">
                            <FaShare className="text-lg" />
                            <span className="text-sm font-bold">{formatNumber(formattedArticle.shares)}</span>
                        </div>

                        <div className="flex flex-col justify-center items-center p-4">
                            <FaEye className="text-lg" />
                            <span className="text-sm font-bold">{formatNumber(formattedArticle.views)}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full bg-black dark:bg-[#aaa] absolute top-0 left-0 translate-x-[3px] translate-y-[3px] z-[-1]"></div>
            </div>

			<ShareModal isOpen={isShareModalOpened} onClose={() => setIsShareModalOpened(false)} />
        </div>
    );
};

export default ArticleDetail;