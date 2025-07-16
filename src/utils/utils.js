export const formatDate = (date) => {
	const newDate = new Date(date);

	const month = newDate.toLocaleDateString("en-US", { month: "short" });

	const day = newDate.getDate();

	const year = newDate.getFullYear();

	const formattedDate = `${month} ${day}, ${year}`;

	return formattedDate;
};

export const formatArticles = (articles) => {
	return articles.map((article) => {
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
}