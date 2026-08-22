import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import TimeLabel from "@/components/TimeLabel";
import CategoryLabel from "@/features/categories/components/CategoryLabel";
import BreadCrumb from "@/components/BreadCrumb";
import Loader from "@/components/Loader";
import { formatNumber } from "@/utils/utils";
import { FaShare, FaEye } from "react-icons/fa";
import ShareModal from "@/components/ShareModal";
import useArticle from "../hooks/useArticle";

const ArticleDetail = () => {
	const contentRef = useRef(null);
	const { articleId } = useParams();
	const [isShareModalOpened, setIsShareModalOpened] = useState(false);

	const { data, isLoading, error } = useArticle(articleId);

	useEffect(() => {
		if (data?.article) {
			contentRef.current.innerHTML = data.article.content.html;
		}
	}, [data, articleId]);

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

				<div className="w-full h-[200px] sm:h-[500px] border-2 border-black dark:border-[#aaa] overflow-hidden relative mt-2.5">
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
				</div>

				<div
					ref={contentRef}
					className="prose dark:prose-invert max-w-none mt-4"></div>
			</div>

			<div className="h-fit static sm:sticky top-1/2 left-0 transform sm:-translate-y-1/2 z-10">
				<div className="sm:w-[80px] bg-[#F3F1E8] dark:bg-[#1F1F1F] border-2 border-black dark:border-[#aaa] relative z-10 p-2.5">
					<div className="flex sm:flex-col justify-evenly items-center">
						<div
							onClick={() => setIsShareModalOpened(true)}
							className="flex flex-col justify-center items-center p-4 cursor-pointer hover:text-blue-500 transition-colors">
							<FaShare className="text-lg" />
							<span className="text-sm font-bold">
								{formatNumber(formattedArticle.shares)}
							</span>
						</div>

						<div className="flex flex-col justify-center items-center p-4">
							<FaEye className="text-lg" />
							<span className="text-sm font-bold">
								{formatNumber(formattedArticle.views)}
							</span>
						</div>
					</div>
				</div>
				<div className="w-full h-full bg-black dark:bg-[#aaa] absolute top-0 left-0 translate-x-[3px] translate-y-[3px] z-[-1]"></div>
			</div>

			<ShareModal
				isOpen={isShareModalOpened}
				onClose={() => setIsShareModalOpened(false)}
			/>
		</div>
	);
};

export default ArticleDetail;
