import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Models } from "@/components/keyword/Models";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";

export default function KeyWords() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain topSectionBackground activeNavItem="catalog">
        <div>
          <ContainerFullWidth className="bg-pattern">
            <div className="max-w-7xl mx-auto py-10">
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
