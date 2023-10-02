import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { MLContent } from "@/components/ML/MLContent";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";

/*
export async function getStaticProps() {

  const data = await getStrapiData("legal-notice", false);
  return {
    props: { data },
  };
}*/

export default function LegalNotice(/*{ data }: any*/) {
  const { data, mutate: getStrapi } = useStrapi("legal-notice", false);

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
              <MLContent data={data} />
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
