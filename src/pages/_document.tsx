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

        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var w=window;var ic=w.Intercom;if(typeof ic==='function'){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/av0ctpsx';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();",
          }}
        ></script>

        {/* INTERCOM */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.Intercom('boot', { api_base: 'https://api-iam.intercom.io', app_id: 'av0ctpsx'});",
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
