import routes from "@/routes";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef, forwardRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from 'next/image'
import { CategoryBadge } from "@/components/_shared/badges/CategoryBadges";
import { useDispatch } from "react-redux";
import { toRead, toRegular } from "@/store/slices/cursorSlice";

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
  const dispatch = useDispatch();

  const categoryEl = useRef<any>();

  const redirectToDetails = (id: string) => {
    push({ pathname: routes.BLOG_DETAIL, query: { slug: id } });
  };

  const redirectToCategory = (id: string) => {
    push({ pathname: routes.BLOG_CATEGORY, query: { slug: id } });
  };

  if (article) {
    return (
      <div
        className="group flex flex-col justify-between gap-dashboard-spacing-element-medium pt-dashboard-spacing-element-medium px-dashboard-spacing-element-medium bg-dashboard-button-dark border rounded-dashboard-button-square-radius cursor-pointer hover:border-dashboard-button-stroke-hover focus-visible:outline focus-visible:outline-blueBerry transition-color duration-300 shadow-large"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          if (e.target !== categoryEl.current) {
            redirectToDetails(article.attributes.slug);
          } else {
            redirectToCategory(
              article.attributes.blog_category.data.attributes.category
            );
          }
        }}
        onMouseEnter={() => { dispatch(toRead())}}
        onMouseLeave={() => { dispatch(toRegular())}}
      >
        <div className="flex flex-col w-full md:w-4/5 gap-dashboard-button-separation-spacing">
          <p className="text-dashboard-text-description-base opacity-80 uppercase leading-none">
            {dayjs(article.attributes.updatedAt)
              .locale("fr")
              .format("DD MMMM YYYY")}
          </p>

          <div
            className="text-title-medium text-dashboard-text-title-white-high md:text-dashboard-text-description-base transition-color duration-300 group-focus-visible:text-dashboard-text-title-white-high group-hover:text-dashboard-text-title-white-high"
          >
            {article.attributes.title}
          </div>

          <CategoryBadge className='opacity-100 md:opacity-50 transition-opacity duration-300 group-focus-visible:opacity-100 group-hover:opacity-80' category={article.attributes.blog_category.data.attributes.category} />

          <p className="text-base transition-color duration-300 text-dashboard-text-description-base md:text-dashboard-text-description-base-low group-focus-visible:text-dashboard-text-description-base group-hover:text-dashboard-text-description-base">
            {article.attributes.short_intro}
          </p>
        </div>

        <div
          className="relative w-full h-0 pb-[50%] bg-cover bg-center rounded-t-dashboard-button-square-radius md:opacity-80 md:group-hover:opacity-100 transition-opacity duration-200 overflow-hidden"
        >
          <Image
            alt={article.attributes.image.image.data.attributes.alternativeText}
            src={article.attributes.image.image.data.attributes.url}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 63vw"
          />
        </div>
      </div>
    )
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
    <button
      ref={ref}
      className={`${className} capitalize flex justify-center items-center w-max bg-darkgrey px-4 h-[34px] rounded-full transition-colors hover:bg-primary-middle focus-visible:outline-blueBerry`}
      
    >
      {article.attributes.blog_category.data.attributes.category}
    </button>
  );
});
