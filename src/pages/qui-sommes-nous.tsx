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
import { useEffect } from "react";
import { TitleReveal } from "@/components/whoweare/TitleReveal";

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
  const { data, mutate: getStrapi } = useStrapi(
    "about-me?" +
    "populate[head][populate]=*&" +
    "populate=message_img&" +
    "populate[text_image][populate]=*&" +
    "populate[arrow_cards][populate]=*",
    false);
  const { data: dataFaqs, mutate: getStrapiFaqs } = useStrapi("faqs", false);

  useEffect(() => {
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

          {data && <TitleReveal />}

          <ContainerFullWidth>
            {data && <NewWaySection data={data.text_image}/>}
          </ContainerFullWidth>

          {data && <ArrowCards data={data.arrow_cards} />}

          <ContainerFullWidth>
            {dataFaqs && <FaqSection data={dataFaqs} filter="about-us" />}
            <NewsletterSection />
          </ContainerFullWidth>
        </div>
      </LayoutMain>
    </>
  );
}
