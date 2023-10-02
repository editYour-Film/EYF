import { H1 } from "@/components/_shared/typography/H1";
import routes from "@/routes";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef, forwardRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

type BlogArticleProps = {
  article: any;
  display: "horizontal" | "vertical";
  noBorder?: boolean;
};

export const BlogArticle = ({
  article,
  display,
  noBorder,
}: BlogArticleProps) => {
  const { push } = useRouter();

  const categoryEl = useRef<any>();
  const isMd = useMediaQuery("(max-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");

  const redirectToDetails = (id: string) => {
    push({ pathname: routes.BLOG_DETAIL, query: { slug: id } });
  };

  const redirectToCategory = (id: string) => {
    push({ pathname: routes.BLOG_CATEGORY, query: { slug: id } });
  };

  if (article) {
    return display === "vertical" ? (
      <div
        className="group flex flex-col self-stretch gap-4 py-6 cursor-pointer rounded-xl p-2 md:p-4"
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
        <div
          className="relative w-full h-0 pb-[70%] bg-cover bg-center rounded-2xl md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-200"
          style={{
            backgroundImage:
              article.attributes.image && article.attributes.image.image.data
                ? "url(" +
                  article.attributes.image.image.data.attributes.url +
                  ")"
                : "",
          }}
        >
          {isMd && (
            <CategoryEl
              article={article}
              ref={categoryEl}
              className="absolute"
            />
          )}
        </div>

        {!isMd && (
          <div className="mt-7">
            <CategoryEl article={article} ref={categoryEl} />
          </div>
        )}

        <H1
          textSize="text-xl"
          className="md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200"
        >
          {article.attributes.title}
        </H1>

        <p className="n27 opacity-80 uppercase">
          {dayjs(article.attributes.updatedAt)
            .locale("fr")
            .format("DD MMMM YYYY")}
        </p>

        {!noBorder && <hr className="mt-auto mb-0" />}
      </div>
    ) : (
      <div
        className="group py-5 border-y"
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
        <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full md:w-11/12 cursor-pointer">
          <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div
              className="w-full h-0 pb-[55%] md:pb-0 md:h-48 md:w-72 bg-cover bg-center rounded-2xl md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200"
              style={{
                backgroundImage:
                  article.attributes.image &&
                  article.attributes.image.image.data
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
            ></div>

            <div className="flex flex-col gap-4">
              <CategoryEl article={article} ref={categoryEl} />

              <p className="flex flex-row lg:flex-col xl:flex-row gap-4 lg:mt-10 lg:pl-4 xl:gap-10">
                <span className="n27 text-gray opacity-80 uppercase w-max shrink-0">
                  {dayjs(article.attributes.updatedAt)
                    .locale("fr")
                    .format("DD MMMM YYYY")}
                </span>
                <span className="n27 text-gray block xl:inline xl:ml-5 opacity-80 w-max shrink-0">
                  {article.attributes.minutes} mins
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:max-w-sm md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200">
            <H1
              textSize="text-[28px] leading-[120%] md:text-2xl"
              className="max-w-sm "
              fake
            >
              {article.attributes.title}
            </H1>
            <p className="mt-9 lg:mt-auto lg:mb-0 opacity-50">
              {article.attributes.short_intro}
            </p>
          </div>
        </div>
      </div>
    );
  } else return <></>;
};

type CategoryElProps = {
  article: any;
  className?: string;
};

const CategoryEl = forwardRef(function CategoryEl(
  { article, className }: CategoryElProps,
  ref: any
) {
  return (
    <span
      ref={ref}
      className={`${className} capitalize flex justify-center items-center w-max bg-darkgrey px-4 h-[34px] rounded-full transition-colors hover:bg-primary-middle`}
    >
      {article.attributes.blog_category.data.attributes.category}
    </span>
  );
});
