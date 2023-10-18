import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* FONTS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/n27" rel="stylesheet" />

        {/* AXEPTIO */}
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.axeptioSettings = {
  clientId: "6505804bf909f43e3daacdfb",
};
 
(function(d, s) {
  var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
  e.async = true; e.src = "https://static.axept.io/sdk-slim.js";
  t.parentNode.insertBefore(e, t);
})(document, "script");`,
          }}
        />

      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Tracking Hubspot */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/139855704.js"></script>
      </body>
    </Html>
  );
}
