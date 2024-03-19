import LayoutMain from "@/components/layouts/LayoutMain";
import LayoutQuote from "@/components/layouts/LayoutQuote";
import { QuoteContent } from "@/components/quote/QuoteContent";
import { disableCustomCursor } from "@/store/slices/cursorSlice";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Widget } from "@typeform/embed-react";

export default function Duration() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableCustomCursor());
  }, []);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      {/* <LayoutQuote>
        <QuoteContent />
      </LayoutQuote> */}

      <LayoutMain noFooter>
        <div className="w-full h-[calc(100vh-300px)] lg:h-[calc(100vh-100px)]">
          <Widget
            fullScreen={true}
            id="WVu9Lcrc"
            style={{ width: "50%" }}
            className="my-form"
          />
        </div>
      </LayoutMain>
    </>
  );
}
