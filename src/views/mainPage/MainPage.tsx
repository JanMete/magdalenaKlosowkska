import ArticleBox from '../../components/articleBox/ArticleBox';
import { articles } from '../../utils/articles';

const MainPage: React.FC = () => {
  return (
    <div>
      {articles.map((article) => {
        return (
          <ArticleBox
            key={article.id}
            title={article.title}
            url={article.url}
            postId={article.postId}
            additionalUrl={article.additionalUrl}
          />
        );
      })}
    </div>
  );
};

export default MainPage;
