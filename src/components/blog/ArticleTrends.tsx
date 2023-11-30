import Image from "next/image";
import { BlogArticle } from "./shared/BlogArticle";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/router";
import routes from "@/routes";
import dayjs from "dayjs";
import { CardsContainer } from "../_shared/UI/CardsContainer";
import { CategoryBadge } from "../_shared/badges/CategoryBadges";
import { IslandButton } from "../_shared/buttons/IslandButton";
import { useDispatch } from "react-redux";
import { toRead, toRegular } from "@/store/slices/cursorSlice";

require("dayjs/locale/fr");

type ArticleTrendsProps = {
  articles: any;
};
export const ArticleTrends = ({ articles }: ArticleTrendsProps) => {
  articles.sort((a:any, b:any) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
  
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <CardsContainer
      headingComp={<MainArticle article={articles[0]} />}
    >
      {articles.slice(1, 5)?.map((article: any, i: number) => {
          return (
            <BlogArticle
              key={article.id}
              article={article}
              display={"vertical"}
            />
          );
      })}
    </CardsContainer>
  );
};

type MainArticleProps = {
  article: any;
};

const MainArticle = ({ article }: MainArticleProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch()

  return (
    <button
      className="relative w-full group border border-dashboard-button-stroke-default bg-dashboard-button-dark pt-[64px] md:px-[64px] rounded-dashboard-button-square-radius cursor-pointer hover:border-dashboard-button-stroke-hover focus-within:outline focus-visible:outline focus-visible:outline-blueBerry focus-within:outline-blueBerry shadow-large transition-color duration-300 overflow-hidden"
      onClick={() => { push({ pathname: routes.BLOG_DETAIL, query: { slug: article.attributes.slug } }); }}
      onMouseEnter={() => { dispatch(toRead())}}
      onMouseLeave={() => { dispatch(toRegular())}}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-20 z-0"></div>
      
      <div className="relative flex flex-col justify-between items-center gap-dashboard-spacing-element-medium z-20">
        <div className="flex flex-col px-[8px] md:px-0  w-full max-w-[580px] items-center gap-dashboard-spacing-element-medium">
          <div className="flex flex-col items-center gap-dashboard-specific-radius">
            <div className="text-center text-title-medium transition-color duration-300 text-dashboard-text-description-base group-focus-visible:text-dashboard-text-title-white-high group-hover:text-dashboard-text-title-white-high">{article.attributes.title}</div>
            
            <CategoryBadge className='opacity-50 transition-opacity duration-300 group-focus-visible:opacity-100 group-hover:opacity-80' category={article.attributes.blog_category.data.attributes.category} />

            <p className="text-base text-center text-dashboard-text-description-base-low transition-color duration-300 group-focus-visible:text-dashboard-text-description-base group-hover:text-dashboard-text-description-base">
              {article.attributes.short_intro}
            </p>
          </div>

        </div>
        <div
          className="w-full h-0 pb-[100%] md:pb-[35%] bg-cover bg-no-repeat bg-center relative md:rounded-t-dashboard-medium-radius overflow-hidden"
        >
          <Image 
            alt={article.attributes.image.image.data.attributes.alternativeText}
            src={article.attributes.image.image.data.attributes.url}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 63vw"
          />
        </div>

        {/* {isMobile && metaInfo} */}
        
      </div>

      {/* {!isMobile && metaInfo} */}
    </button>
  );
};
