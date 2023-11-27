import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStrapi from "@/hooks/useStrapi";

import { CategoriesList } from "../../../components/blog/shared/CategoriesList";
import { Title } from "@/components/_shared/Title";
import { BlogArticle } from "@/components/blog/shared/BlogArticle";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { useDispatch } from "react-redux";
import { setRouteName } from "@/store/slices/routesSlice";

const BlogCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    dispatch(setRouteName({name: 'blog'}))
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

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain activeNavItem="blog">
        <div className="ml-4 md:mx-10 lg:mx-28 fullHd:w-[1300px] fullHd:mx-auto ">
          {categories && (
            <CategoriesList
              categories={categories}
              current={currentCategory}
              onChange={(selectedCategories: any) => {                
                setCurrentCategory(selectedCategories);
              }}
            />
          )}

          <div className="categoryTitle mt-14 flex flex-row divide-x gap-10">
            <Title titleType="h1">{currentCategory}</Title>
          </div>

          <div className="mt-14 flex flex-col gap-5">
            {articles.length ? (
              articles.map((article: any, i: number) => {
                return (
                  <BlogArticle
                    key={i}
                    display="horizontal"
                    article={article}
                  ></BlogArticle>
                );
              })
            ) : (
              <div>Aucun article</div>
            )}
          </div>
        </div>

        <ContainerFullWidth>
          <NewsletterSection />
        </ContainerFullWidth>
      </LayoutMain>
    </>
  );
};

export default BlogCategory;
