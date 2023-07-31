import { useParams } from "react-router";
import ArticleList from "./ArticleList";

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

export default FilterArticleList

