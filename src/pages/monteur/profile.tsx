import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Models } from "@/components/monteur/Models";
import { VideoFilter } from "@/components/_shared/video/VideoCatalog";
import routes from "@/routes";
import { InfoSection } from "@/components/monteur/InfoSection";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";

export default function Profile() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain topSectionBackground>
        <div>
          <ContainerFullWidth className="bg-pattern">
            <div className="max-w-7xl mx-auto py-10">
              <VideoFilter
                filterSearch
                filterTag
                filterType
                backLink={routes.CATALOGUE}
              />
              <InfoSection />

              <Models />
            </div>
          </ContainerFullWidth>

          <ContainerFullWidth>
            <NewsletterSection />
          </ContainerFullWidth>
        </div>
      </LayoutMain>
    </>
  );
}
