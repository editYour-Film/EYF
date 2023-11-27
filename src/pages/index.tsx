import Head from "next/head";
import { Seo } from "@/components/_shared/Seo";
import LayoutMain from "@/components/layouts/LayoutMain";
import { TopVideoSection } from "@/components/home/TopVideoSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { YourProfessionalVideoSection } from "@/components/home/YourProfessionalVideoSection";
import { ConfidenceSection } from "@/components/home/ConfidenceSection";
import { StepsSection } from "@/components/home/StepsSection";
import { YourVideoSection } from "@/components/home/YourVideoSection";
import { EditorSection } from "@/components/home/EditorSection";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import WhySectionFilterProvider from "@/components/home/context/WhySectionFilter";
import { Marquee } from "@/components/home/Marquee";
import { ComparativeSection } from "@/components/home/ComparativeSection";
import { CreatorToEditor } from "@/components/home/CreatorToEditor";
import { videos } from "../components/data/videos";
import {
  ContainerFullWidth,
  ContainerFull,
} from "@/components/_shared/UI/Container";
import { getStrapiData } from "../components/_prerender/strapiApi";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { setRouteName } from "@/store/slices/routesSlice";
import { useDispatch } from "react-redux";

/*export async function getStaticProps() {
  const data = await getStrapiData(
    "page-home?populate[seo][populate]=*",
    false
  );

  return { props: { seodata: data.seo } };
}*/

export default function Home(/*{ seodata }: any*/) {
  const dispatch = useDispatch()

  const { data, mutate: getStrapi } = useStrapi(
    "page-home?" +
      "populate[head][populate]=*&" +
      "populate[top_video][populate]=*&" +
      "populate[section1][populate]=*&" +
      "populate[section2][populate]=videos.video&" +
      "populate[section3][populate]=*&" +
      "populate[section4][populate]=*&" +
      "populate[marquee][populate]=*&" +
      "populate[section5][populate]=*&" +
      "populate[section6][populate]=*&" +
      "populate[comparison_section][populate][classic_content][populate]=*&" +
      "populate[comparison_section][populate][comparison_cards][populate]=*&" +
      "populate[section2][populate]=videos.thumbnail",
    false
  );
  const { data: dataFaqs, mutate: getStrapiFaq } = useStrapi("faqs", false);

  const { data: seodata, mutate: getSeoData } = useStrapi(
    "page-home?populate[seo][populate]=*",
    false
  );

  useEffect(() => {
    dispatch(setRouteName({name: 'accueil'}))

    getStrapi();
    getStrapiFaq();
    getSeoData();
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {seodata && (
        <Head>
          <Seo data={seodata} />
        </Head>
      )}

      <LayoutMain activeNavItem="home">
        {data && dataFaqs && (
          <div>
            <ContainerFull>
              <TopVideoSection data={{ ...data.top_video, ...data.head }} />
              <PartnersSection />
            </ContainerFull>

            <ContainerFullWidth>
              <YourProfessionalVideoSection data={data.section1} />
            </ContainerFullWidth>

            <ConfidenceSection videos={videos} data={data.section2} />

            <div className="py-10 md:py-20">
              <hr className="absolute left-0 w-full" />
            </div>

            <ContainerFullWidth>
              <StepsSection data={data.section3} />

              <YourVideoSection data={data.section4} />

              <ComparativeSection data={data.comparison_section} />

              <CreatorToEditor />

              {!isMobile && (
                <Marquee
                  firstLine={data.marquee.line_1}
                  secondLine={data.marquee.line_2}
                />
              )}

              <EditorSection data={data.section5} />

              <WhySectionFilterProvider>
                {/* <WhySection data={data.section6} /> */}
              </WhySectionFilterProvider>

              {dataFaqs && <FaqSection data={dataFaqs} />}

              <NewsletterSection />
            </ContainerFullWidth>
          </div>
        )}
      </LayoutMain>
    </>
  );
}
