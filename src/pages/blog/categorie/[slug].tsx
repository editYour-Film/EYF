import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStrapi from "@/hooks/useStrapi";

import { CategoriesList } from "../../../components/blog/shared/CategoriesList";
import { CardArticle } from "@/components/_shared/UI/CardArticle";
import { Button } from "@/components/_shared/buttons/Button";
import { useDispatch } from "react-redux";
import { setRouteName } from "@/store/slices/routesSlice";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { GlobalContext } from "@/components/_context/GlobalContext";
import { ArticleTrends } from "@/components/blog/ArticleTrends";
import { GetServerSideProps } from "next";
import { useGetSeoDataFiltered } from "@/hooks/useGetSeoData";
import { Seo } from "@/components/_shared/Seo";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const slug = query.slug as string;

  const data: any = await useGetSeoDataFiltered(
    "blog-categories",
    `filters[slug][$eq]=${slug.toLowerCase()}`
  );

  return { props: { seodata: data } };
};

const BlogCategory = (props: any) => {
  const { seodata } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const globalContext = useContext(GlobalContext);

  const [maxArticles, setMaxArticles] = useState(3);
  const [availableArticles, setAvailableArticles] = useState<any[]>([]);

  const { slug } = router.query;

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const { data: categories, mutate: getCategories } = useStrapi(
    "blog-categories",
    true
  );

  const [articles, setArticles] = useState<any>([]);

  const [currentCategory, setCurrentCategory] = useState<any>();

  useEffect(() => {
    dispatch(setRouteName({ name: "blog" }));
    getCategories();
    getStrapi();
  }, []);

  useEffect(() => {
    slug && setCurrentCategory([slug]);
  }, [slug]);

  useEffect(() => {
    handleRefresh(currentCategory);
  }, [data, currentCategory]);

  const handleRefresh = (categories: any) => {
    const _articles: any = [];
    data?.forEach((x: any) => {
      categories.forEach((cat: any) => {
        if (
          x.attributes.blog_category.data.attributes.category.toLowerCase() ===
          cat.toLowerCase()
        ) {
          _articles.push(x);
          return;
        }
      });
    });
    setArticles(_articles);
  };

  useEffect(() => {
    setAvailableArticles(articles.slice(0, maxArticles));
  }, [articles, maxArticles]);

  return (
    <>
      {seodata && (
        <Head>
          <title>{seodata.metaTitle}</title>
          <Seo data={seodata} />
        </Head>
      )}

      <LayoutMain activeNavItem="blog">
        <div className="max-w-[1400px] lg:mx-[100px] xl:mx-[167px] 2xl:mx-auto  flex flex-col gap-dashboard-spacing-element-medium md:pt-dashboard-spacing-element-medium">
          <div className="pl-dashboard-mention-padding-right-left md:pl-0">
            {categories && (
              <CategoriesList
                categories={categories}
                current={currentCategory}
                onChange={(selectedCategories: any) => {
                  setCurrentCategory(selectedCategories);
                }}
              />
            )}
          </div>

          <div className="bg-dashboard-background-content-area md:bg-transparent flex flex-col gap-dashboard-spacing-element-medium rounded-dashboard-button-square-radius">
            <h1 className="w-full pl-dashboard-mention-padding-right-left md:pl-0 text-left text-title-large text-soyMilk">
              {currentCategory}
            </h1>

            {availableArticles.length > 2 && (
              <div className="bg-radial-custom absolute top-[1000px] left-0 w-[1000px] h-[500px] translate-x-[-90%] opacity-[0.22]"></div>
            )}

            {articles && (
              <ArticleTrends articles={articles} showPoster={false} />
            )}

            <div className="flex flex-col gap-5 w-full basis-full">
              {availableArticles && availableArticles.length ? (
                availableArticles.slice(4).map((article: any, i: number) => {
                  return <CardArticle key={i} post={article.attributes} />;
                })
              ) : (
                <div>Aucun article</div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            {articles.length > maxArticles + 4 && (
              <Button
                type="primary"
                label="Voir plus d’articles"
                onClick={() => {
                  setMaxArticles(maxArticles + 5);
                }}
                className="w-[360px]"
              />
            )}
          </div>

          <NewsletterSection />
        </div>
      </LayoutMain>
    </>
  );
};

export default BlogCategory;
