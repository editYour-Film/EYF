import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Models } from "@/components/quote/Models";
import { ContainerFullWidth } from "@/components/_shared/UI/Container";

export default function Home() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain quoteNavbar topSectionBackground>
        <div>
          <ContainerFullWidth className="bg-pattern py-10">
            <div className="max-w-7xl mx-auto">
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
