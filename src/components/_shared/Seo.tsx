type SeoProps = {
  data: any;
};

export const Seo = ({ data }: SeoProps) => {
  return (
    <>
      <title>{data.metaTitle}</title>
      <meta
        name="description"
        content={data.metaDescription}
        key="description"
      />
      <meta name="keywords" content={data.keywords} />

      {data.metaSocial &&
        data.metaSocial.map((el: any) => {
          if (el.socialNetwork === "Facebook") {
            return (
              <>
                <meta
                  property="og:url"
                  content={data.canonicalURL}
                  key="og:url"
                />
                <meta property="og:title" content={el.title} key="og:title" />
                <meta
                  property="og:description"
                  content={el.description}
                  key="og:description"
                />
              </>
            );
          } else if (el.socialNetwork === "Twitter") {
            return (
              <>
                <meta
                  name="twitter:card"
                  content="summary_large_image"
                  key="twitter:card"
                />
                <meta name="twitter:site" content={data.canonicalURL} />
                <meta name="twitter:creator" content="@editYourFilm" />
                <meta name="twitter:title" content={el.title} />
                <meta name="twitter:description" content={el.description} />
                {/* <meta name="twitter:image" content={data.metaImage.data.attributes.formats.medium} /> */}
              </>
            );
          }
        })}

      {/* <meta property="og:image" content={data.metaImage.data.attributes.formats.medium} key="og:image" /> */}

      <link rel="canonical" href={data.canonicalURL} />

      {data.metaRobots && (
        <>
          <meta name="robots" content={data.metaRobots}></meta>
          <meta name="googlebot" content={data.metaRobots}></meta>
        </>
      )}
    </>
  );
};
