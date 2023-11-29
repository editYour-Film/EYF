import { RefObject, createRef, useEffect, useRef, useState } from "react";
import { H1 } from "../_shared/typography/H1";
import FbIcon from "../../../public/icons/facebook.svg";
import TwtIcon from "../../../public/icons/twitter-x.svg";
import InstaIcon from "../../../public/icons/instagram.svg";
import LnkdnIcon from "../../../public/icons/linkedin.svg";
import { useLenis } from "@studio-freight/react-lenis";

require("dayjs/locale/fr");

function getCoords(elem:any) { // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

type LeftNavbarProps = {
  article: any;
  percentage: number;
  articleHeight: number;
  currentTitle:number
};
const LeftNavbar = ({ article, percentage = 0, currentTitle, articleHeight}: LeftNavbarProps) => {  
  const parent = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const titles = useRef<RefObject<HTMLButtonElement>[]>(article.paragraphs?.map(() => createRef()))
  
  const [scrollVal, setScrollVal] = useState(0)
  const [offsetTop, setOffsetTop] = useState(0)
  const currentUrl = useRef<string>();

  const lenis = useLenis(({ scroll }:{scroll:number}) => {
    const scrolledPercentage = (scroll - offsetTop + 96) / (articleHeight - window.innerHeight / 2);  
    setScrollVal(scrolledPercentage);
  }, [articleHeight, offsetTop]);

  function scrollSmooth(id: string) {
    var element = document.getElementById(id)?.offsetTop;
    if (element) {
      lenis.scrollTo(element);
    }
  }

  useEffect(() => {
    currentUrl.current = window.location.href;
    setOffsetTop(getCoords(parent.current).top)
  }, [article]);

  useEffect(() => {
    console.log(currentTitle);
  }, [currentTitle])

  useEffect(() => {
    titles.current.forEach((title, i) => {
      if(i <= currentTitle) {
        title.current && title.current.classList.add('text-dashboard-text-title-white-high')
      } else {
        title.current && title.current.classList.remove('text-dashboard-text-title-white-high')
      }


    })
  }, [scrollVal])

  return (
    <div
      className="md:sticky top-24"
      style={{ maxWidth: "400px", minWidth: "250px" }}
      ref={parent}
    >
      <div className="hidden md:block">
        <H1 textSize="text-xl" className="mb-4" fake>
          Sommaire
        </H1>
        <div 
          ref={wrapper}
          className="flex gap-7">
          <div>
            <div className="overflow-hidden h-full w-1.5 rounded-full bg-gray-700">
              <div
                className="w-full rounded-full bg-violet"
                style={{ height: scrollVal * 100 + "%" }}
              ></div>
            </div>
          </div>
          <div className="relative space-y-4">
            {article.paragraphs.map((x: any, i: any) => {
              return (
                <button
                  ref={titles.current[i]}
                  className="block text-left cursor-pointer text-dashboard-text-description-base transition-colors duration-300 opacity-80 hover:opacity-100 focus-visible:outline-blueBerry"
                  key={i}
                  onClick={() => scrollSmooth("title-" + i)}
                >
                  {x.title}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <H1 textSize="text-xl" className="mb-4 mt-10">
            PARTAGER
          </H1>
          <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 mt-5">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl.current}`}
              target="_blank"
              rel="noopener"
              className="focus-visible:outline-blueBerry"
            >
              <FbIcon className="svg-color-dashboard-icon-color-default hover:svg-color-blueBerry w-[35px] h-[35px]"/>
            </a>
            <a
              href="https://www.instagram.com/edityour.film/"
              target="_blank"
              rel="noopener"
              className="focus-visible:outline-blueBerry"
            >
              <InstaIcon className="svg-color-dashboard-icon-color-default hover:svg-color-blueBerry w-[35px] h-[35px]"/>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl.current}&source=editYour.film`}
              target="_blank"
              rel="noopener"
              className="focus-visible:outline-blueBerry"
            >
              <LnkdnIcon className="svg-color-dashboard-icon-color-default hover:svg-color-blueBerry w-[35px] h-[35px]"/>
            </a>
            <a
              href={`http://twitter.com/share?&url=${currentUrl.current}&hashtags=editYourfilm`}
              target="_blank"
              className="flex justify-center items-center w-[35px] h-[35px] focus-visible:outline-blueBerry"
              rel="noopener"
            >
              <TwtIcon className="svg-color-dashboard-icon-color-default hover:svg-color-blueBerry w-[35px] h-[35px]"/>
            </a>
          </div>
        </div>
      </div>
{/* 
      <div className="flex gap-x-4 items-center mt-6 sm:mt-10 mb-6 md:mb-0 bg-primary p-2.5 rounded-2xl">
        <img
          src={article.author.profile_picture.data.attributes.url}
          alt={article.author.name}
          className="h-14 rounded-full"
        />
        <div>
          <p className="n27 mb-2 text-white">{article.author.name}</p>
          <p className="text-sm text-gray opacity-80">
            Mis à jour le{" "}
            {dayjs(article.updatedAt).locale("fr").format("DD MMMM YYYY")}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default LeftNavbar;
