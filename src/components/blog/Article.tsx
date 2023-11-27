import React, { useEffect, useState } from "react";
import LeftNavbar from "./LeftNavbar";
import Image from "next/image";
import { EditorJsParser } from "@/utils/EditorJsParser";
import Breadcrumbs from "./Breadcrumbs";
import { Video } from "../_shared/video/Video";

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
    var elements = document.querySelectorAll("[id*='title-']");
    elements.forEach((element, index) => {
      var position = element.getBoundingClientRect();
      if (position.top >= 0 && position.bottom <= window.innerHeight / 2) {
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

  let Media = <></>
  if (article.video[0]) {
    Media = 
      <Video
        video={article.video[0].video.data.attributes}
        trigger={true}
        className="h-full"
      />

  } else if (article.image && article.image.image.data) {    
    Media = <div className="w-full h-0 pb-[100%] lg:pb-[41%]">
      <Image
        width={article.image.image.data.attributes.width}
        height={article.image.image.data.attributes.height}
        src={article.image.image.data.attributes.url}
        alt={article.image.image.data.attributes.alternativeText}
        className="object-cover absolute top-0 left-0 w-full h-full"
      />
      {article.image.legend !== null && (
        <EditorJsParser JSONContent={article.image.legend} />
      )}
    </div>
  } else {
    Media = <></>
  }  

  return (
    <div>
      <div className="md:flex flex-col relative md:gap-[72px] pt-dashboard-spacing-element-medium justify-between fullHd:max-w-7xl mx-auto border-03 rounded-dashboard-button-separation-spacing overflow-hidden">
        <div className="flex flex-col justify-start">
          <div className="flex flex-col gap-padding-medium pl-[20px] pr-dashboard-mention-padding-right-left md:px-0 max-w-[700px] md:ml-[100px]">
            <Breadcrumbs title={article.blog_category.data.attributes.category} />
            <h1 className="text-title-large text-soyMilk">{article.title}</h1>
            <div className="text-base text-dashboard-text-description-base">
              <EditorJsParser JSONContent={article.intro} />
            </div>
          </div>

          <div className="relative pt-[50px] pb-dashboard-spacing-element-medium">
            <div className="article__main_img relative w-full px-dashboard-mention-padding-right-left z-10">
              <div className="rounded-dashboard-button-separation-spacing overflow-hidden">
                <div className="relative w-full">
                  { Media }
                </div>
              </div>
            </div>

            <div 
              className="absolute top-0 lef-0 w-full h-full z-0 blur-[32px] opacity-40"
              aria-hidden
            >
              <div className="absolute top-0 left-0 w-full h-[150px] gradient-to-top-black-transparent rotate-180 z-10"></div>
              { Media }
            </div>
          </div>

        </div>
      </div>

      <div className="article__content flex flex-row justify-between gap-[58px] py-dashboard-spacing-element-medium pl-[20px] pr-dashboard-mention-padding-right-left md:pl-[100px] md:pr-[62px]">
        <div className="w-full xl:w-[542px] xl:shrink-0">
          {article.paragraphs.map((x: any, i: any) => {
            return (
              <div className="mb-[72px]" key={i}>
                <h2 className="text-title-medium leading-[120%] mb-[36px]" id={"title-" + i}>
                  {x.title}
                </h2>
                <EditorJsParser JSONContent={x.text} />
              </div>
            );
          })}
        </div>
        <div className="hidden lg:block grow p-dashboard-spacing-element-medium">
          <LeftNavbar percentage={progress} article={article} />
        </div>
      </div>
    </div>
  );
};
