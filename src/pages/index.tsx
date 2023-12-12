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
import { ComparativeSection } from "@/components/home/ComparativeSection";
import { CreatorToEditor } from "@/components/home/CreatorToEditor";
import { videos } from "../components/data/videos";
import Container, {
  ContainerFull,
} from "@/components/_shared/UI/Container";
import useStrapi from "@/hooks/useStrapi";
import { useContext, useEffect } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { setRouteName } from "@/store/slices/routesSlice";
import { useDispatch } from "react-redux";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { GlobalContext } from "@/components/_context/GlobalContext";

/*export async function getStaticProps() {
  const data = await getStrapiData(
    "page-home?populate[seo][populate]=*",
    false
  );

  return { props: { seodata: data.seo } };
}*/

export default function Home(/*{ seodata }: any*/) {
  const dispatch = useDispatch();
  const globalContext = useContext(GlobalContext)

  const { data, mutate: getStrapi } = useStrapi(
    "page-home?" +
      "populate[head][populate]=*&" +
      "populate[top_video][populate][video][populate]=*&" +
      "populate[top_video][populate][editor_video][populate]=*&" +
      "populate[section1][populate]=*&" +
      "populate[section2][populate]=videos.video&" +
      "populate[section3][populate]=*&" +
      "populate[section4][populate]=*&" +
      "populate[marquee][populate]=*&" +
      "populate[section5][populate]=*&" + 
      "populate[section6][populate]=*&" +
      "populate[comparison_section][populate][classic_content][populate]=*&" +
      "populate[comparison_section][populate][comparison_cards][populate]=*&" +
      "populate[transition_mockup][populate]=*&" +
      "populate[section2][populate]=videos.thumbnail",
    false
  );
  const { data: dataFaqs, mutate: getStrapiFaq } = useStrapi("faqs", false);

  const { data: seodata, mutate: getSeoData } = useStrapi(
    "page-home?populate[seo][populate]=*",
    false
  );

  useEffect(() => {
    dispatch(setRouteName({ name: "accueil" }));

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
          <div className="flex flex-col gap-[100px]">
            {data.top_video && data.head &&
              <ContainerFull>
                <TopVideoSection data={{ ...data.top_video, ...data.head }} />
              </ContainerFull>
            }

            <Container>
              <PartnersSection />
            </Container>
            
            {data.section1 && (
            <Container>
              <YourProfessionalVideoSection data={data.section1} />
            </Container>
            )}

            <Container>

            { data.section3 &&
                <StepsSection data={data.section3} />
            }
            </Container>

            {data.section2 && (
              <ConfidenceSection videos={videos} data={data.section2} />
            )}

            <div className="relative w-full">
              <Container>
                <YourVideoSection data={data.section4} />
              </Container>

              <hr className="pb-[100px]"/>

              <div className="hidden md:block absolute right-0 bg-radial-gradient-pink w-[600px] h-[400px] translate-x-[33%]"></div>

              <Container>
                <div className="relative w-full">
                  {data.comparison_section && (
                    <ComparativeSection data={data.comparison_section} />
                  )}
                </div>
              </Container>
            </div>

            {data.transition_mockup &&
              <CreatorToEditor data={data.transition_mockup}/>
            }


            {data.section5 && 
              <Container>
                <EditorSection data={data.section5} />
              </Container>
            }

            {dataFaqs && 
              <FaqSection data={dataFaqs} />
            }

            <Container>
              <GradientCard
                title='PARRAINER UN AMI'
                content='Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui.'
                hasCta 
                type="email"
                placeholder="Email" 
                ctaLabel="Envoyer le lien de parrainage"
                onClick={(email: string) => { globalContext.sendSponsorLink(email)}}
              />
            </Container>

          </div>
        )}
      </LayoutMain>
    </>
  );
}
