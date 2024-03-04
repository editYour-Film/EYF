import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { FaqSection } from "@/components/home/FaqSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { TopSection } from "@/components/whoweare/TopSection/TopSection";
import { HistorySection } from "@/components/whoweare/HistorySection";
import { NewWaySection } from "@/components/whoweare/NewWaySection";
import { ArrowCards } from "@/components/whoweare/ArrowCards";
import useStrapi from "@/hooks/useStrapi";
import { useContext, useEffect, useRef } from "react";
import { TitleReveal } from "@/components/whoweare/TitleReveal";
import { setRouteName } from "@/store/slices/routesSlice";
import { useDispatch } from "react-redux";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { GlobalContext } from "@/components/_context/GlobalContext";
import GradientPlanet from "@/img/whoweare/gradient-planet.svg";
import { Team } from "@/components/whoweare/team/Team";
import { ImgContent } from "@/components/whoweare/ImgContent";
import { useGetSeoData } from "@/hooks/useGetSeoData";
import { Seo } from "@/components/_shared/Seo";

export async function getServerSideProps() {
  const data: any = await useGetSeoData("about-me");

  return { props: { seodata: data } };
}

export default function WhoWeAre(props: any) {
  const { seodata } = props;

  const dispatch = useDispatch();
  const stickySections = useRef<HTMLDivElement>(null);

  const globalContext = useContext(GlobalContext);
  const { data, mutate: getStrapi } = useStrapi(
    "about-me?" +
      "populate[head][populate]=*&" +
      "populate=message_img&" +
      "populate[text_image][populate]=*&" +
      "populate[arrow_cards][populate]=*&" +
      "populate[team][populate][team_members][populate]=*&" +
      "populate[text_content][populate]=*",
    false
  );
  const { data: dataFaqs, mutate: getStrapiFaqs } = useStrapi("faqs", false);

  useEffect(() => {
    dispatch(setRouteName({ name: "notre histoire" }));

    getStrapi();
    getStrapiFaqs();
  }, []);

  return (
    <>
      {seodata && (
        <Head>
          <title>{seodata.metaTitle}</title>
          <Seo data={seodata} />
        </Head>
      )}

      <LayoutMain activeNavItem="who-we-are">
        <div>
          {data && <TopSection data={data.head} />}

          <div className="relative z-20 bg-blackBerry mt-[20vh]">
            <div className="relative w-full -translate-y-full">
              <GradientPlanet />
            </div>

            {data && <TitleReveal data={data.text_content} />}

            {data && <HistorySection data={data} />}

            <ContainerFullWidth>
              {data && <NewWaySection data={data.text_image} />}
            </ContainerFullWidth>

            <div ref={stickySections}>
              {data && <ArrowCards data={data.arrow_cards} />}

              <div className="sticky top-0 xl:-top-[50vh] z-0">
                {data && <ImgContent data={data.arrow_cards} />}
              </div>

              <div className="relative z-10">
                {data && <Team data={data.team} />}
              </div>
            </div>

            <ContainerFullWidth>
              {dataFaqs && <FaqSection data={dataFaqs} filter="about-us" />}
              <div className="max-w-[1400px] lg:mx-[100px] xl:mx-[167px] 2xl:mx-auto md:pt-[90px] flex flex-col gap-dashboard-spacing-element-medium">
                <GradientCard
                  title="PARRAINER UN AMI"
                  content="Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui."
                  hasCta
                  type="email"
                  placeholder="Email"
                  ctaLabel="Envoyer le lien de parrainage"
                  onClick={(email: string) => {
                    globalContext.sendSponsorLink(email);
                  }}
                />
              </div>
            </ContainerFullWidth>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
