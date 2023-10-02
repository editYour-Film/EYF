import Image from "next/image";
import { H1 } from "../_shared/typography/H1";
import { BlogArticle } from "./shared/BlogArticle";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/router";
import routes from "@/routes";
import dayjs from "dayjs";
import { useRef } from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

require("dayjs/locale/fr");

type ArticleTrendsProps = {
  articles: any;
};
export const ArticleTrends = ({ articles }: ArticleTrendsProps) => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="px-4 md:px-0">
      <H1 className="mb-10">À la une</H1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MainArticle article={articles[0]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1, 5)?.map((article: any, i: number) => {
            if (!isMobileScreen) {
              return (
                <BlogArticle
                  key={article.id}
                  article={article}
                  display={"vertical"}
                />
              );
            } else {
              return <MainArticle key={i} article={article} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

type MainArticleProps = {
  article: any;
};

const MainArticle = ({ article }: MainArticleProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { push } = useRouter();

  const redirectToDetails = (id: string) => {
    push({ pathname: routes.BLOG_DETAIL, query: { slug: id } });
  };

  const redirectToCategory = (id: string) => {
    push({ pathname: routes.BLOG_CATEGORY, query: { slug: id } });
  };

  const categoryEl = useRef<any>();
  const metaInfo = () => {
    return (
      <div className="relative flex items-end justify-between z-20 ">
        <div>
          <span className="n27 text-gray opacity-80">
            {dayjs(article.attributes.updatedAt)
              .locale("fr")
              .format("DD MMMM YYYY")}
          </span>
          <span className="n27 text-gray ml-10 opacity-80">
            {article.attributes.minutes} mins
          </span>
        </div>

        {!isMobile && (
          <div>
            <p className="bg-violet w-14 h-14 flex items-center justify-center cursor-pointer rounded-full transition-transform duration-200 hover:scale-110">
              <Image
                src="/icons/right-arrow-white.svg"
                width={26}
                height={18}
                alt=""
              />
            </p>
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className="flex flex-col justify-between border-y py-6 md:border gap-8 md:bg-background-card lg:hover:bg-gray-light transition-all duration-200 md:rounded-3xl md:p-6 cursor-pointer"
      onClick={(e) => {
        if (e.target !== categoryEl.current) {
          redirectToDetails(article.attributes.slug);
        } else {
          redirectToCategory(
            article.attributes.blog_category.data.attributes.category
          );
        }
      }}
    >
      <div className="relative flex flex-col gap-4 md:gap-7 z-20">
        <div
          className="w-full h-0 pb-[100%] md:max-w-xl bg-cover bg-no-repeat bg-center rounded-2xl relative border"
          style={{
            backgroundImage:
              article.attributes.image && article.attributes.image.image.data
                ? `url("${
                    /*new CloudinaryImage(article.attributes.image.image.data.attributes.provider_metadata.public_id,
                  {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
                    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
                  }).resize(scale().width(500)).format('auto').toURL()*/ article
                      .attributes.image.image.data.attributes.url
                  }")`
                : "",
          }}
        >
          <span
            ref={categoryEl}
            className="bg-[rgba(1,3,4,0.6)] bg-opacity-20 px-4 py-2 rounded-full absolute top-4 left-4"
          >
            {article.attributes.blog_category.data.attributes.category}
          </span>
        </div>

        {isMobile && metaInfo()}

        <H1 textSize="text-[28px] md:text-2.5xl">{article.attributes.title}</H1>
        <p className="text-lg opacity-80 mt-5 md:mt-0">
          {article.attributes.short_intro}
        </p>
      </div>

      {!isMobile && metaInfo()}
    </div>
  );
};
