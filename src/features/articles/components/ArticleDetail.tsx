import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import TimeLabel from "@/components/TimeLabel";
import CategoryLabel from "@/features/categories/components/CategoryLabel";
import BreadCrumb from "@/components/BreadCrumb";
import ShareModal from "@/components/ShareModal";
import useArticle from "../hooks/useArticle";
import ArticleDetailSkeleton from "./ArticleDetailSkeleton";

import { Article } from "@/types/article";

const ArticleDetail = () => {
	const { articleId } = useParams();
	const { data, isLoading, error } = useArticle(articleId);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isShareModalOpened, setIsShareModalOpened] = useState(false);

	useEffect(() => {
		if (data && contentRef.current) {
			contentRef.current.innerHTML = data.content.html;
		}
	}, [data, articleId]);

	if (error) {
		console.error("Error fetching article:", error);
		return <div>Error loading article</div>;
	}

	if (isLoading) return <ArticleDetailSkeleton />;

	if (!data) {
		return <div>No article found</div>;
	}

	const formattedArticle: Article = {
		...data,
		createdAt: new Date(data.createdAt).toLocaleDateString(),
	};

	const breadCrumbItems = [
		{ label: "Home", to: "/" },
		{ label: formattedArticle.title },
	];

	return (
		<div className="flex sm:flex-row-reverse flex-col gap-5">
			<div className="grid gap-2.5 flex-1">
				<BreadCrumb items={breadCrumbItems} />

				<h1 className="text-3xl md:text-4xl font-extrabold leading-none mt-5">
					{formattedArticle.title}
				</h1>
				<TimeLabel time={formattedArticle.createdAt} />

				{formattedArticle.image && (<div className="w-full h-[200px] sm:h-[500px] border-0 border-black dark:border-[#fff] overflow-hidden relative mt-2.5 rounded-lg">
					<img
						src={formattedArticle.image.url}
						className="w-full h-full object-cover"
						alt={formattedArticle.image.url}
					/>
					<div className="flex gap-2 absolute top-2 left-2">
						{formattedArticle.categories.map((category) => (
							<CategoryLabel
								key={category.id}
								category={category}
							/>
						))}
					</div>
				</div>)}

				<div
					ref={contentRef}
					className="prose dark:prose-invert max-w-none mt-4"></div>
			</div>

			<ShareModal
				isOpen={isShareModalOpened}
				onClose={() => setIsShareModalOpened(false)}
			/>
		</div>
	);
};

export default ArticleDetail;
