import React, { useEffect, useState } from "react";
import LeftNavbar from "./LeftNavbar";
import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import { EditorJsParser } from "@/utils/EditorJsParser";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { useLenis } from "@studio-freight/react-lenis";

type ArticleProps = {
  article: any;
};

export const Article = ({ article }: ArticleProps) => {
  const [elementsToCheck, setElementsToCheck] = useState<number>();
  const [progress, setProgress] = useState(0);
  const [displayedTitleId, setDisplayedTitleId] = useState(0);

  useEffect(() => {
    const _elementsToCheck: string[] = [];
    article?.paragraphs.map((x: any, i: any) => {
      _elementsToCheck.push("title-" + i);
    });
    setElementsToCheck(_elementsToCheck.length);
  }, []);

  let _displayedTitleId = 0;
  let dataDisplayedIndex = 0;

  const handleScroll = function () {
    var elements = document.querySelectorAll("h1[id*='title-']");
    elements.forEach((element, index) => {
      var position = element.getBoundingClientRect();
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        _displayedTitleId = parseInt(element?.id.split("-")[1]);
        dataDisplayedIndex = index + 1;
      }
    });

    if (elementsToCheck) {
      setDisplayedTitleId(_displayedTitleId);
      setProgress((dataDisplayedIndex / elementsToCheck) * 100);
    }
  };

  useEffect(() => {
    elementsToCheck && window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementsToCheck]);

  return (
    <>
      <div className="md:flex relative md:gap-24 justify-between mt-6 md:mt-16 fullHd:max-w-7xl mx-auto">
        <div>
          <LeftNavbar percentage={progress} article={article} />
        </div>
        <div className="w-full" style={{ maxWidth: "700px" }}>
          <div>
            <H1>{article.title}</H1>
            <br />
            <EditorJsParser JSONContent={article.intro} />

            <div className="article__main_img w-full my-10 rounded-3xl overflow-hidden">
              <div className="relative w-full h-0 pb-[100%] lg:pb-[65%]">
                {article.image && article.image.image.data && (
                  <>
                    <Image
                      width={690}
                      height={450}
                      src={article.image.image.data.attributes.url}
                      /*src={ new CloudinaryImage(article.image.image.data.attributes.provider_metadata.public_id,
                        {
                          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
                          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
                          apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
                        }).resize(scale().width(700)).format('auto').toURL()
                      }*/
                      alt={article.image.image.data.attributes.alternativeText}
                      className="object-cover absolute top-0 left-0 w-full h-full"
                    />
                    {article.image.legend !== null && (
                      <EditorJsParser JSONContent={article.image.legend} />
                    )}
                  </>
                )}
              </div>
            </div>

            {article.paragraphs.map((x: any, i: any) => {
              return (
                <React.Fragment key={i}>
                  <H1 textSize="text-3xl" className="my-8" id={"title-" + i}>
                    {x.title}
                  </H1>
                  <EditorJsParser JSONContent={x.text} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
