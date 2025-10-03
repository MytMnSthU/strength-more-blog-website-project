import ArticleCard from "./ArticleCard";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";
import { formatArticles } from "../utils/utils";
import useArticles from "../hooks/useArticles";
import { GET_ARTICLES, GET_POPULAR_ARTICLES } from "../graphql/query";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import { stagger, animate, createScope } from "animejs";

const ArticleList = ({ title, category }) => {
	const { categoryId } = useParams();
	const articleListRoot = useRef(null);
	const scope = useRef(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useArticles({
		query: category === "popular" ? GET_POPULAR_ARTICLES : GET_ARTICLES,
		category: categoryId || category,
	});

	useEffect(() => {
		if(!articleListRoot?.current?.children?.length) return;
		
		const newCards = Array.from(articleListRoot.current.children).slice(-((data?.pages?.[data.pages.length - 1]?.articles?.length) || articleListRoot.current.children.length));
		
		scope.current = createScope({ root: articleListRoot.current }).add(() => {
			animate(newCards, {
				translateY: [100, 0],
				translateX: [100, 0],
				scale: [0.8, 1],
				filter: ['blur(30px)', 'blur(0px)'],
				opacity: [0, 1],
				ease: 'out(2.4)',
				duration: 400,
				delay: stagger(80, { start: 50, from: 'first' }),
			});
		});
		return () => scope.current.revert();
	}, [data]);

	if (error) {
		console.error("Error fetching articles:", error);
		return (
			<div
				className=" text-red-700 px-4 py-3 relative my-4"
				role="alert">
				<strong className="font-bold">Error:</strong>
				<span className="block sm:inline ml-2 text-lg">Failed to load articles.</span>
			</div>
		);
	}

	if (isLoading)
		return (
			<div className=" w-full h-full">
				<Loader />
			</div>
		);

	if (data?.pages?.length) {
		const formattedArticles = formatArticles(data.pages.flatMap((page) => page.articles));

		return (
			<>
				<div
					className="grid gap-2.5">
					<h3 className=" text-2xl font-extrabold test-title">
						{title} {categoryId && `: "${categoryId}"`}
					</h3>
					<div
						ref={articleListRoot}
						className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
						{formattedArticles.map((article) => (
							<ArticleCard
								key={article.id}
								article={article}
							/>
						))}
					</div>
					{title.toLowerCase() === "recent articles" && hasNextPage && (
						<div className="flex justify-center items-center">
							<LoadMoreButton
								onClickBtn={() => fetchNextPage()}
								isLoading={isFetchingNextPage}>
								more articles
							</LoadMoreButton>
						</div>
					)}
				</div>
			</>
		);
	}
};

export default ArticleList;
