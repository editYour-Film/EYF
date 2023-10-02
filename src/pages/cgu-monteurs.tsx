import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import { TopSection } from "@/components/whoweare/TopSection";
import { MentorContent } from "@/components/cgu/MentorContent";
import useStrapi from "@/hooks/useStrapi";
import { useEffect } from "react";

/*
export async function getStaticProps() {

  const data = await getStrapiData("cgu-mentor", false);
  return {
    props: { data },
  };
}*/

export default function CguMentors(/*{ data }: any*/) {
  const { data, mutate: getStrapi } = useStrapi("cgu-mentor", false);

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
              <MentorContent data={data} />
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
