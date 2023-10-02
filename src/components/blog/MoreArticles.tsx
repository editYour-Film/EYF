import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { H1 } from "../_shared/typography/H1";
import routes from "@/routes";
import dayjs from "dayjs";
import { CategoryTag } from './shared/CategoryTag'

export const MoreArticles = ({ articles, current }: any) => {
  const [prevNext, setPrevNext] = useState<any[]>();

  useEffect(() => {
    const prev = articles.indexOf(current) - 1 >= 0 ? articles.indexOf(current) - 1 : articles.length - 1;
    const next = articles.indexOf(current) + 1 <= articles.length - 1 ? articles.indexOf(current) + 1 : 0;

    setPrevNext([articles[prev], articles[next]])
  }, [current])

  return (
    <>
      <div className="py-12 mt-20 bg-primary">
        <div className="max-w-6xl mx-auto">
          <H1 className="mb-12 text-center" fake>Voir plus d’articles</H1>
          <div className="w-full flex flex-col lg:flex-row items-start justify-center px-4 lg:px-0 gap-4">
            {prevNext?.map((x: any, i:number) => {
              return (
                <div
                  key={i}
                  className={`${i === 0 && 'hidden md:block'} block w-full lg:basis-[50%]`}
                >
                  <ArticleCard 
                  article={x} 
                  label={i === 0 ? 'Précédent' : 'Suivant'} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

type ArticleCardProps = {
  article:any, 
  label: string,
  onClick?: Function
}

const ArticleCard = ({article, label, onClick}:ArticleCardProps) => {
  const { push } = useRouter();
    
  const categoryEl = useRef<any>();

  const redirectToDetails = (id: string, article: any) => {
    push({ pathname: routes.BLOG_DETAIL, query: { slug: id }}, undefined);
  };

  const redirectToCategory = (id: string) => {    
    push({pathname: routes.BLOG_CATEGORY, query: { slug: id} }, undefined);
  };

  return (
      <>
        <div
          className="group flex flex-col self-stretch gap-4 py-6 cursor-pointer"
          onClick={(e) => {
            if(e.target !== categoryEl.current) { 
              onClick && onClick(article)
              redirectToDetails(article.attributes.slug, article)
            }
            else { redirectToCategory(article.attributes.blog_category.data.attributes.category)}
          }}
        >
  
          <div className="relative" >
            <div
              className="block relative w-full h-0 pb-[66%] md:pb-[33%] bg-cover bg-center rounded-xl md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-200"
              style={{
                backgroundImage:
                  article.attributes.image && article.attributes.image.image.data
                    ? "url(" +
                      article.attributes.image.image.data.attributes.url +
                      ")"
                    : "",
              }}
            >
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center n27 uppercase text-3xl">{label}</div>
          </div>

          <div  className="block mt-8" >
            <CategoryTag article={article} ref={categoryEl}/>
          </div>

          <H1 textSize="text-xl" className="mt-4 max-w-[60%] md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200">{article.attributes.title}</H1>

          <p className="mt-4 n27 opacity-80 uppercase">
            {dayjs(article.attributes.updatedAt)
              .locale("fr")
              .format("DD MMMM YYYY")}
          </p>
        </div>
      </>
  )
}
