import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { TopSection } from "@/components/catalogue/TopSection";
import { Models } from "@/components/catalogue/Models";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";

export default function Catalog() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain topSectionBackground activeNavItem="catalog">
        <div>
          <ContainerFullWidth className="max-w-7xl mx-auto">
            <TopSection />
          </ContainerFullWidth>

          <ContainerFullWidth>
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
