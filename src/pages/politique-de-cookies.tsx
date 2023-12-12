import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";
import { PolitiqueCookiesContent } from "@/components/PolitiqueCookies/PolitiqueCookiesContent";

/*
export async function getStaticProps() {

  const data = await getStrapiData("cookies-page", false);
  return {
    props: { data },
  };
}*/

export default function PolitiqueCookies(/*{ data }: any*/) {
  const { data, mutate: getStrapi } = useStrapi("cookies-page", false);

  useEffect(() => {
    getStrapi();
  }, []);
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain topSectionBackground>
        <div>
          {data && (
            <ContainerFullWidth>
              <PolitiqueCookiesContent data={data} />
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
