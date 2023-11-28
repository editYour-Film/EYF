import { useState } from "react";
import { CardArticle } from "../_shared/UI/CardArticle";
import { Button } from "../_shared/buttons/Button";

type ArticelTrendsProps = {
  articles: any;
};

export const ArticleRecent = ({ articles }: ArticelTrendsProps) => { 
  const [max, setMax] = useState(8) 

  return (
    <div className="flex flex-col w-full gap-dashboard-spacing-element-medium items-center bg-dashboard-background-content-area md:bg-transparent">
      <div className="flex flex-col w-full gap-dashboard-spacing-element-medium">
        {articles.slice(5, max).map((x: any, i:number) => {
          return <CardArticle key={i} post={x.attributes} />;
        })}
      </div>

      {articles.length - 1 > max &&
        <Button 
          type="primary"
          label="Voir plus d’articles"
          onClick={() => { setMax(max + 10)}}
          className="w-[360px]"
        />
      }
    </div>
  );
};
