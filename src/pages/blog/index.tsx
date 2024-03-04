import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ArticleTrends } from "@/components/blog/ArticleTrends";
import { ArticleRecent } from "@/components/blog/ArticleRecent";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";
import { CategoriesList } from "@/components/blog/shared/CategoriesList";
import { useRouter } from "next/router";
import routes from "@/routes";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { setRouteName } from "@/store/slices/routesSlice";
import { useDispatch } from "react-redux";
import { useGetSeoData } from "@/hooks/useGetSeoData";
import { Seo } from "@/components/_shared/Seo";

export async function getServerSideProps() {
  const data: any = await useGetSeoData("blog-page");

  return { props: { seodata: data } };
}

export default function Blog(props: any) {
  const { seodata } = props;

  const { push } = useRouter();
  const dispatch = useDispatch();

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const { data: categories, mutate: getCategories } = useStrapi(
    "blog-categories",
    true
  );

  useEffect(() => {
    dispatch(setRouteName({ name: "blog" }));
    getCategories();
    getStrapi();
  }, []);

  return (
    <>
      {seodata && (
        <Head>
          <title>{seodata.metaTitle}</title>
          <Seo data={seodata} />
        </Head>
      )}

      <LayoutMain activeNavItem="blog">
        <div className="flex flex-col gap-dashboard-spacing-element-medium md:pt-dashboard-spacing-element-medium">
          {data && data.length > 0 && (
            <div className="max-w-[1400px] md:px-dashboard-spacing-element-medium xl:mx-[167px] 2xl:mx-auto flex flex-col gap-dashboard-spacing-element-medium">
              {categories && (
                <CategoriesList
                  categories={categories}
                  current={[]}
                  onChange={(selectedCategories: any) => {
                    selectedCategories.length &&
                      push({
                        pathname: routes.BLOG_CATEGORY,
                        query: { slug: selectedCategories },
                      });
                  }}
                />
              )}

              <ArticleTrends articles={data} showPoster />
              <ArticleRecent articles={data} />

              <GradientCard
                title="PARRAINER UN AMI"
                content="Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui."
                hasCta
                type="email"
                placeholder="Email"
                ctaLabel="Envoyer le lien de parrainage"
                onClick={(email: string) => {}}
                className="my-[70px]"
              />
            </div>
          )}
        </div>
      </LayoutMain>
    </>
  );
}
