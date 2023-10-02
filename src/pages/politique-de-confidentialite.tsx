import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";
import { PolitiqueConfidentialiteContent } from "@/components/PolitiqueConfidentialite/PolitiqueConfidentialiteContent";

/*
export async function getStaticProps() {

  const data = await getStrapiData("cookies-preference", false);
  return {
    props: { data },
  };
}*/

export default function PreferencesCookies(/*{ data }: any*/) {
  const { data, mutate: getStrapi } = useStrapi(
    "politique-de-confidentialite",
    false
  );

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
              <PolitiqueConfidentialiteContent data={data} />
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
