import { GlobalContext } from "@/components/_context/GlobalContext";
import { Seo } from "@/components/_shared/Seo";
import Container, {
  ContainerFullWidth,
} from "@/components/_shared/UI/Container";
import { Article } from "@/components/blog/Article";
import { MoreArticles } from "@/components/blog/MoreArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import LayoutMain from "@/components/layouts/LayoutMain";
import { useGetSeoDataFiltered } from "@/hooks/useGetSeoData";
import useStrapi from "@/hooks/useStrapi";
import { setRouteName } from "@/store/slices/routesSlice";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const slug = query.slug;

  const data: any = await useGetSeoDataFiltered(
    "articles",
    `filters[slug][$eq]=${slug}`
  );

  return { props: { seodata: data } };
};

export default function BlogDetails(props: any) {
  const { seodata } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const globalContext = useContext(GlobalContext);
  const { slug } = router.query;

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[video][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const [article, setArticle] = useState<any>();

  useEffect(() => {
    dispatch(setRouteName({ name: "blog" }));
    getStrapi();
  }, []);

  useEffect(() => {
    if (data && slug)
      setArticle(data.find((x: any) => x.attributes.slug === slug));

    data?.sort((a: any, b: any) => {
      const d1 = Date.parse(a.attributes.createdAt);
      const d2 = Date.parse(b.attributes.createdAt);

      return d1 - d2;
    });
  }, [data, slug]);

  return (
    <>
      {seodata && (
        <Head>
          <title>{seodata.metaTitle}</title>
          <Seo data={seodata} />
        </Head>
      )}

      <LayoutMain activeNavItem="blog">
        {article && (
          <>
            <div className="max-w-[1400px] lg:mx-[100px] xl:mx-[167px] 2xl:mx-auto md:pt-[90px] flex flex-col gap-dashboard-spacing-element-medium bg-blackBerry rounded-dashboard-button-separation-spacing">
              <Article article={article.attributes} />
            </div>
          </>
        )}

        <ContainerFullWidth>
          {article && <MoreArticles articles={data} current={article} />}
        </ContainerFullWidth>

        <Container>
          <NewsletterSection />
        </Container>
      </LayoutMain>
    </>
  );
}
