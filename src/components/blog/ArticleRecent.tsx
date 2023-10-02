import { H1 } from "../_shared/typography/H1";
import { BlogArticle } from "./shared/BlogArticle";

type ArticelTrendsProps = {
  articles: any;
};
export const ArticleRecent = ({ articles }: ArticelTrendsProps) => {  
  return (
    <div className="mt-5 md:mt-0 px-4 md:px-0">
      <H1 className="hidden md:block my-10 md:mt-20">Articles récents</H1>
      <div className="flex flex-col gap-5">
        {articles.slice(6, 10).map((x: any, i:number) => {
          return <BlogArticle key={i} display="horizontal" article={x} />;
        })}
      </div>
    </div>
  );
};
