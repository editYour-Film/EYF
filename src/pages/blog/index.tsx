import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ArticleTrends } from "@/components/blog/ArticleTrends";
import { ArticleRecent } from "@/components/blog/ArticleRecent";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { getStrapiData } from "../../components/_prerender/strapiApi";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";
import { CategoriesList } from "@/components/blog/shared/CategoriesList";
import { useRouter } from "next/router";
import routes from "@/routes";

/*export async function getStaticProps() {
  const data = await getStrapiData(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[paragraphs][populate]=*",
    false
  );
  return {
    props: { data },
  };
}*/

export default function Blog(/*{ data }: any*/) {
  const { push } = useRouter();

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const { data: categories, mutate: getCategories } = useStrapi(
    "blog-categories",
    true
  );

  useEffect(() => {
    getCategories();
    getStrapi();
  }, []);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain activeNavItem="blog">
        <div>
          {data && data.length > 0 && (
            <ContainerFullWidth className="max-w-7xl mx-auto">
              {categories &&
                <CategoriesList 
                  categories={categories} 
                  current={[]}
                  onChange={(selectedCategories:any) => {
                    selectedCategories.length && push({pathname: routes.BLOG_CATEGORY, query: { slug: selectedCategories} });
                  }}
                  className='mb-6 md:mb-12'
                />
              }
              <ArticleTrends articles={data} />
              <ArticleRecent articles={data} />
            </ContainerFullWidth>
          )}

          <ContainerFullWidth>
            <NewsletterSection />
          </ContainerFullWidth>
        </div>
      </LayoutMain>
    </>
  );
}
