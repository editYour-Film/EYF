type SeoProps = {
  data: any;
};

export const Seo = ({ data }: SeoProps) => {
  return (
    <>
      {data.metaDescription && (
        <meta
          name="description"
          content={data.metaDescription}
          key="description"
        />
      )}
      {data.keywords && <meta name="keywords" content={data.keywords} />}

      {data.metaSocial &&
        data.metaSocial.map((el: any) => {
          if (el.socialNetwork === "Facebook") {
            return (
              <>
                {data.canonicalURL && (
                  <meta
                    property="og:url"
                    content={data.canonicalURL}
                    key="og:url"
                  />
                )}

                {el.title && (
                  <meta property="og:title" content={el.title} key="og:title" />
                )}

                {el.description && (
                  <meta
                    property="og:description"
                    content={el.description}
                    key="og:description"
                  />
                )}

                {el.image && (
                  <meta
                    property="og:image"
                    content={el.image.data.attributes.formats.medium.url}
                    key="og:image"
                  />
                )}
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
                {data.canonicalURL && (
                  <meta name="twitter:site" content={data.canonicalURL} />
                )}

                <meta name="twitter:creator" content="@editYourFilm" />
                {el.title && <meta name="twitter:title" content={el.title} />}
                {el.description && (
                  <meta name="twitter:description" content={el.description} />
                )}
                {el.image && (
                  <meta
                    name="twitter:image"
                    content={el.image.data.attributes.formats.medium.url}
                  />
                )}
              </>
            );
          }
        })}

      {data.canonicalURL && <link rel="canonical" href={data.canonicalURL} />}

      {data.metaRobots && (
        <>
          <meta name="robots" content={data.metaRobots}></meta>
          <meta name="googlebot" content={data.metaRobots}></meta>
        </>
      )}
    </>
  );
};
