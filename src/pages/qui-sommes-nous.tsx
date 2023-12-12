import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { getStrapiData } from "../components/_prerender/strapiApi";
import { TopSection } from "@/components/whoweare/TopSection";
import { HistorySection } from "@/components/whoweare/HistorySection";
import { NewWaySection } from "@/components/whoweare/NewWaySection";
import { ArrowCards } from "@/components/whoweare/ArrowCards";
import useStrapi from "@/hooks/useStrapi";
import { useContext, useEffect } from "react";
import { TitleReveal } from "@/components/whoweare/TitleReveal";
import { setRouteName } from "@/store/slices/routesSlice";
import { useDispatch } from "react-redux";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { GlobalContext } from "@/components/_context/GlobalContext";

{
  /* 
export async function getStaticProps() {
  const data = await getStrapiData("about-me", false);

  const dataFaqs = await getStrapiData("faqs", false);
  return {
    props: {data, dataFaqs },
  };
}
*/
}

export default function WhoWeAre(/*{ data, dataFaqs }: any*/) {
  const dispatch = useDispatch()
  const globalContext = useContext(GlobalContext)
  const { data, mutate: getStrapi } = useStrapi(
    "about-me?" +
    "populate[head][populate]=*&" +
    "populate=message_img&" +
    "populate[text_image][populate]=*&" +
    "populate[arrow_cards][populate]=*&" +
    "populate[text_content][populate]=*",
    false);
  const { data: dataFaqs, mutate: getStrapiFaqs } = useStrapi("faqs", false);

  useEffect(() => {
    dispatch(setRouteName({name: 'notre histoire'}))

    getStrapi();
    getStrapiFaqs();
  }, []);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain activeNavItem="who-we-are">
        <div>
          {data && <TopSection data={data.head}/>}

          {data && <HistorySection data={data} />}

          {data && <TitleReveal data={data.text_content} />}

          <ContainerFullWidth>
            {data && <NewWaySection data={data.text_image}/>}
          </ContainerFullWidth>

          {data && <ArrowCards data={data.arrow_cards} />}

          <ContainerFullWidth>
            {dataFaqs && <FaqSection data={dataFaqs} filter="about-us" />}
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
          </ContainerFullWidth>
        </div>
      </LayoutMain>
    </>
  );
}
