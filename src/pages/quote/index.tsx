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

      <LayoutMain>
        <div className="w-full h-[100vh]">
          <Widget
            width="100%"
            height="100%"
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
