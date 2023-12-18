import LayoutQuote from "@/components/layouts/LayoutQuote";
import { QuoteContent } from "@/components/quote/QuoteContent";
import Head from "next/head";

export default function Duration() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutQuote>
        <QuoteContent />
      </LayoutQuote>
    </>
  );
}
