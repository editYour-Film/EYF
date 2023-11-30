import { GlobalContext } from "@/components/_context/GlobalContext";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { Article } from "@/components/blog/Article";
import { MoreArticles } from "@/components/blog/MoreArticles";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import LayoutMain from "@/components/layouts/LayoutMain";
import useStrapi from "@/hooks/useStrapi";
import { setRouteName } from "@/store/slices/routesSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function BlogDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const globalContext = useContext(GlobalContext)
  const { slug } = router.query;

  const { data, mutate: getStrapi } = useStrapi(
    "articles?populate[blog_category][populate]=*&populate[author][populate]=*&populate[image][populate]=*&populate[video][populate]=*&populate[paragraphs][populate]=*",
    false
  );

  const [article, setArticle] = useState<any>();

  useEffect(() => {
    dispatch(setRouteName({name: 'blog'}))
    getStrapi();
  }, []);

  useEffect(() => {
    if (data && slug) setArticle(data.find((x: any) => x.attributes.slug === slug));

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

        <div className="max-w-[1400px] lg:mx-[100px] xl:mx-[167px] 2xl:mx-auto md:pt-[90px] flex flex-col gap-dashboard-spacing-element-medium">
          <GradientCard
            title='PARRAINER UN AMI'
            content='Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui.'
            hasCta 
            type="email"
            placeholder="Email" 
            ctaLabel="Envoyer le lien de parrainage"
            onClick={(email: string) => { globalContext.sendSponsorLink(email)}}
          />
        </div>

      </LayoutMain>
    </>
  );
}
