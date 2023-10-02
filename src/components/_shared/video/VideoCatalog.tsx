import { useState } from "react";
import Carousel from "react-multi-carousel";
import { H3 } from "../typography/H3";
import Image from "next/image";
import Input from "../form/Input";
import Button from "../form/Button";
import Link from "next/link";
import routes from "@/routes";
import { VideoListSection } from "@/components/model/videos";

export const carouselResponsiveOptions = {
  desktop: {
    breakpoint: { min: 1024, max: 5000 },
    items: 3,
  },
  tablet: {
    breakpoint: { min: 640, max: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export const carouselResponsiveOptionsIsMobile = {
  desktop: {
    breakpoint: { min: 1024, max: 5000 },
    items: 4,
  },
  tablet: {
    breakpoint: { min: 640, max: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

type videoCatalogProps = {
  videoCatalog: VideoListSection;
  isCarousel?: boolean;
  filterSearch?: boolean;
  filterTag?: boolean;
  filterType?: boolean;
  isMobile?: boolean;
  className?: string;
};
export const VideoCatalog = ({
  videoCatalog,
  isCarousel = true,
  filterSearch = false,
  filterTag = false,
  filterType = false,
  isMobile = false,
  className,
}: videoCatalogProps) => {
  const [isMore, setisMore] = useState(false);
  const [isCarouselDisplay, setIsCarouselDisplay] = useState(true);
  const [videoPath, setVideoPath] = useState("");

  return (
    <div className={className}>
      <VideoFilter
        filterSearch={filterSearch}
        filterTag={filterTag}
        filterType={filterType}
      />

      <div className="mt-10">
        {videoCatalog.title && (
          <div className="flex gap-4 justify-between items-center mb-5 md:mb-8">
            <H3>{videoCatalog.title}</H3>
            {isCarousel && (
              <Button
                variant="primary"
                text={isMore ? "Voir moin" : "Voir plus"}
                onClick={() => {
                  setisMore(!isMore);
                  setIsCarouselDisplay(!isCarouselDisplay);
                }}
                className="min-w-fit w-max"
              />
            )}
          </div>
        )}
        {isCarouselDisplay && isCarousel ? (
          <Carousel
            responsive={
              isMobile
                ? carouselResponsiveOptionsIsMobile
                : carouselResponsiveOptions
            }
            infinite={true}
            customRightArrow={<CustomRightArrow isMobile={isMobile} />}
            customLeftArrow={<CustomLeftArrow isMobile={isMobile} />}
          >
            {videoCatalog.videos.map((x, i) => {
              return (
                <div key={i} className="sm:mr-2 md:mr-4">
                  {isMobile ? (
                    <div
                      className="w-full bg-cover bg-no-repeat bg-center rounded-2xl relative cursor-pointer border"
                      style={{
                        backgroundImage: "url(" + x.thumbnail + ")",
                        height: "516px",
                      }}
                      onClick={() => setVideoPath(x.path)}
                    >
                      {x.type === "an" && <AvailableNow />}
                    </div>
                  ) : (
                    <div
                      className="w-full h-56 bg-cover bg-no-repeat bg-center rounded-2xl relative cursor-pointer border"
                      style={{ backgroundImage: "url(" + x.thumbnail + ")" }}
                      onClick={() => setVideoPath(x.path)}
                    >
                      {x.type === "an" && <AvailableNow />}
                    </div>
                  )}

                  <VideoInfo
                    profilePath={x.profilePath}
                    title={x.title}
                    madeBy={x.madeBy}
                  />
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div
            className={
              "grid sm:grid-cols-2 gap-y-5 sm:gap-y-10 gap-x-5 " +
              (isMobile ? "lg:grid-cols-4" : "lg:grid-cols-3")
            }
          >
            {videoCatalog.videos.map((x, i) => {
              return (
                <div key={i}>
                  {isMobile ? (
                    <div
                      className="w-full bg-cover bg-no-repeat bg-center rounded-2xl relative cursor-pointer"
                      style={{
                        backgroundImage: "url(" + x.thumbnail + ")",
                        height: "516px",
                      }}
                      onClick={() => setVideoPath(x.path)}
                    >
                      {x.type === "an" && <AvailableNow />}
                    </div>
                  ) : (
                    <div
                      className="w-full h-56 bg-cover bg-no-repeat bg-center rounded-2xl relative cursor-pointer"
                      style={{ backgroundImage: "url(" + x.thumbnail + ")" }}
                      onClick={() => setVideoPath(x.path)}
                    >
                      {x.type === "an" && <AvailableNow />}
                    </div>
                  )}
                  <VideoInfo
                    profilePath={x.profilePath}
                    title={x.title}
                    madeBy={x.madeBy}
                  />
                </div>
              );
            })}
          </div>
        )}
        {videoPath.length > 0 && (
          <div className="px-5 md:px-32 py-8 fixed left-0 top-0 w-full h-screen bg-black bg-opacity-90 z-50 backdrop-blur-sm flex flex-col justify-between items-center">
            <div className="flex justify-end w-full">
              <Image
                src="/icons/cross-white.svg"
                alt="close"
                width={30}
                height={30}
                onClick={() => setVideoPath("")}
                className="cursor-pointer hover:opacity-70 duration-200"
              />
            </div>
            <video className="w-full max-w-4xl" controls autoPlay>
              <source src={videoPath} type="video/mp4" />
            </video>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomRightArrow = ({ isMobile, onClick }: any) => {
  return (
    <button
      onClick={() => onClick()}
      className={
        "absolute right-5 md:right-10  hover:opacity-70 transition-all duration-200 " +
        (isMobile ? "top-60" : "top-20")
      }
    >
      <Image
        src="/icons/carousel-right-arrow.svg"
        alt="carousel arrow"
        width={27}
        height={50}
      />
    </button>
  );
};

const CustomLeftArrow = ({ isMobile, onClick }: any) => {
  return (
    <button
      onClick={() => onClick()}
      className={
        "absolute left-5 md:left-10 hover:opacity-70 rotate-180 transition-all duration-200 " +
        (isMobile ? "top-60" : "top-20")
      }
    >
      <Image
        src="/icons/carousel-right-arrow.svg"
        alt="carousel arrow"
        width={27}
        height={50}
      />
    </button>
  );
};

type videoTagProps = {
  name: string;
};
export const Tag = ({ name }: videoTagProps) => {
  return (
    <Link href={routes.SEARCH_KEYWORD}>
      <button className="bg-white bg-opacity-10 border border-transparent hover:border-white p-2 md:p-2.5 transition-all duration-500 rounded-full flex gap-3 items-center justify-center cursor-pointer">
        {/*<span className="rounded-full p-1 border border-white">
        <Image
          src="/icons/cross-white.svg"
          width={10}
          height={10}
          alt="remove"
  />
      </span>*/}
        {name}
      </button>
    </Link>
  );
};

type TagListProps = {
  tags: videoTagProps[];
  className?: string;
};
export const TagList = ({ tags, className }: TagListProps) => {
  return (
    <div className={"flex flex-wrap gap-2 " + className}>
      {tags.map((x, i) => {
        return <Tag key={i} name={x.name} />;
      })}
    </div>
  );
};

type VideoFilterProps = {
  filterSearch: boolean;
  filterTag: boolean;
  filterType: boolean;
  backLink?: string | undefined;
  className?: string;
};
export const VideoFilter = ({
  filterSearch,
  filterTag,
  filterType,
  backLink,
  className,
}: VideoFilterProps) => {
  const [search, setSearch] = useState("");
  const options = [
    {
      label: "16/9 éme",
      value: "16/9",
    },
    {
      label: "9/16 éme",
      value: "9/16",
    },
    {
      label: "Carré",
      value: "carre",
    },
    {
      label: "Disponible dès maintenant",
      value: "an",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("16/9");

  const tags = [
    { name: "Instagram" },
    { name: "Cinéma" },
    { name: "Cuisine" },
    { name: "Court-métrage" },
    { name: "Animation" },
    { name: "Documentaire" },
    { name: "Youtube" },
    { name: "Reportage" },
    { name: "Journal télévisé" },
    { name: "Reportage animalier" },
    { name: "Enfant" },
    { name: "Automobile" },
  ];

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-8 justify-between items-center">
        <div className="flex gap-4 items-center w-full max-w-xl justify-start">
          {backLink && (
            <div>
              <Link href={backLink}>
                <Image
                  src="/icons/right-arrow-white.svg"
                  width="30"
                  height="20"
                  alt=""
                  className="rotate-180"
                />
              </Link>
            </div>
          )}
          {filterSearch && (
            <div className="w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                bg="black"
                iconRight
                placeholder="Rechercher par mots-clés..."
              />
            </div>
          )}
        </div>

        {filterType && (
          <Input
            type="radio"
            options={options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
          />
        )}
      </div>

      {filterTag && <TagList tags={tags} className="mt-8" />}
    </div>
  );
};

type VideoInfoProps = {
  profilePath: string;
  title: string;
  madeBy: string;
};
const VideoInfo = ({ profilePath, title, madeBy }: VideoInfoProps) => {
  return (
    <div className="flex justify-between items-start mt-4">
      <Link href={routes.MENTOR_CATALOGUE}>
        <div className="flex gap-3 justify-start items-end cursor-pointer">
          {/* <div
            className=" h-14 w-14 bg-cover bg-no-repeat bg-center rounded-full"
            style={{
              backgroundImage: "url(" + profilePath + ")",
            }}
          ></div>*/}
          <div className="pl-2">
            <p className="text-lg">{title}</p>
            <p className="mt-0.5 ">{madeBy}</p>
          </div>
        </div>
      </Link>
      {/* 
      <div>
        <Image
          src="/icons/points.svg"
          alt="more"
          width={4}
          height={16}
          className="cursor-pointer mt-4"
        />
      </div>
      */}
    </div>
  );
};

const AvailableNow = () => {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-2 bg-black bg-opacity-50 rounded-xl w-52 absolute top-3 right-3">
      <span className="rounded-full bg-green w-4 h-4"></span>
      <span className="opacity-80 text-sm font-medium">
        Disponible dès demain
      </span>
    </div>
  );
};
