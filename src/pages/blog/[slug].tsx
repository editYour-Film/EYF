import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { Article } from "@/components/blog/Article";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { MoreArticles } from "@/components/blog/MoreArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import LayoutMain from "@/components/layouts/LayoutMain";
import useStrapi from "@/hooks/useStrapi";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BlogDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const [article, setArticle] = useState<any>();

  useEffect(() => {
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
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain activeNavItem="blog">
        <div className="p-4 md:px-8 2xl:p-0">
          {article && (
            <>
              <ContainerFullWidth className="max-w-7xl mx-auto">
                <Breadcrumbs title={article.attributes.title} />
                <Article article={article.attributes} />
              </ContainerFullWidth>
            </>
          )}
        </div>

        <ContainerFullWidth>
          {article && <MoreArticles articles={data} current={article} />}
          <NewsletterSection />
        </ContainerFullWidth>
      </LayoutMain>
    </>
  );
}
