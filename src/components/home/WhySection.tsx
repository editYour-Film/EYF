import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Input from "../_shared/form/Input";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useWhySectionFilter } from "./context/WhySectionFilter";

gsap.registerPlugin(ScrollTrigger);

export const WhySection = ({ data }: any) => {
  const [whySectionFilter, setWhySectionFilter] = useWhySectionFilter();

  const main = useRef<any>();
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const ts = gsap.timeline();
      ts.to("#scrollbar", { duration: 2, height: "33%" })
        .to("#img1", { duration: 0.2, opacity: 0 })
        .to("#img2", { duration: 0.2, zIndex: 2 }, "<")
        .to("#img2", { duration: 0.2, filter: "blur(0)" }, "<")
        .to("#img2", { duration: 0.2, width: "100%" }, "<")
        .to("#img2", { duration: 0.2, top: "0" }, "<")
        .to("#img2", { duration: 0.2, left: "0" }, "<")

        .to("#content1", { duration: 0.2, opacity: 0 }, "<")
        .to("#content2", { duration: 0.2, opacity: 1 }, ">")

        .to("#scrollbar", { duration: 2, height: "66%" })
        .to("#img2", { duration: 0.2, opacity: 0 })
        .to("#img3", { duration: 0.2, zIndex: 2 }, "<")
        .to("#img3", { duration: 0.2, filter: "blur(0)" }, "<")
        .to("#img3", { duration: 0.2, width: "100%" }, "<")
        .to("#img3", { duration: 0.2, top: "0" }, "<")
        .to("#img3", { duration: 0.2, left: "0" }, "<")

        .to("#content2", { duration: 0.2, opacity: 0 }, "<")
        .to("#content3", { duration: 0.2, opacity: 1 }, ">")
        .to("#scrollbar", { duration: 2, height: "100%" });

      ScrollTrigger.create({
        trigger: "#scrollbar",
        start: isMobileScreen ? "-=380" : "-=250",
        end: "+=1600",
        animation: ts,
        scrub: true,
        pin: "#animation-container",
      });
    }, main);

    return () => ctx.revert();
  }, [isMobileScreen]);

  useEffect(() => {
    let isRefreshed = false;
    window.addEventListener("scroll", () => {
      if (!isRefreshed) {
        var element = document.querySelector("#animation-container");
        var position = element?.getBoundingClientRect();
        if (
          position &&
          position.top < window.innerHeight &&
          position.bottom >= 0
        ) {
          ScrollTrigger.refresh();
          isRefreshed = true;
        }
      }
    });
  }, []);

  const [selectedOption, setSelectedOption] = useState(whySectionFilter.filter);
  const options = [
    {
      label: "Créateur",
      value: "creator",
    },
    {
      label: "Monteur",
      value: "mentor",
    },
  ];

  useEffect(() => {
    setWhySectionFilter({ filter: selectedOption });
  }, [selectedOption]);

  return (
    <div ref={main} className="max-w-7xl mx-auto">
      <div className="pt-14 md:pt-48" id="animation-container">
        <div className="mb-8 md:mb-16 mx-auto w-min">
          <Input
            type="switch"
            options={options}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-6">
          <div className="w-full md:max-w-sm relative">
            {selectedOption === "creator" ? (
              <>
                <div className="transition-opacity duration-1000" id="content1">
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.creator_part1_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.creator_part1_text}
                  </p>
                </div>

                <div
                  className="absolute left-0 top-0 opacity-0 transition-opacity duration-1000"
                  id="content2"
                >
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.creator_part2_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.creator_part2_text}
                  </p>
                </div>

                <div
                  className="absolute left-0 top-0 opacity-0 transition-opacity duration-1000"
                  id="content3"
                >
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.creator_part3_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.creator_part3_text}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="transition-opacity duration-1000" id="content1">
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.mentor_part1_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.mentor_part1_text}
                  </p>
                </div>

                <div
                  className="absolute left-0 top-0 opacity-0 transition-opacity duration-1000"
                  id="content2"
                >
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.mentor_part2_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.mentor_part2_text}
                  </p>
                </div>

                <div
                  className="absolute left-0 top-0 opacity-0 transition-opacity duration-1000"
                  id="content3"
                >
                  <H2 arrow fake>{data.section_title}</H2>
                  <H1 className="text-violet py-3 md:py-6" fake>
                    {data.mentor_part3_title}
                  </H1>
                  <p className="opacity-70 md:max-w-xs">
                    {data.mentor_part3_text}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="pr-4 flex gap-8 w-full md:max-w-3xl">
            <div className="relative w-full h-full pb-10">
              <div
                id="img1"
                className="transition-opacity z-10 relative duration-1000"
              >
                <Image
                  src="/img/home/img4.png"
                  alt=""
                  width={710}
                  height={460}
                  className="w-full rounded-lg"
                />
              </div>
              <div
                id="img2"
                className="absolute left-16 top-24 blur-md w-10/12 transition-all duration-1000"
              >
                <Image
                  src="/img/home/img3.png"
                  alt=""
                  width={710}
                  height={460}
                  className="w-full rounded-lg"
                />
              </div>
              <div
                id="img3"
                className="absolute left-16 top-24 blur-md w-10/12 transition-all duration-1000"
              >
                <Image
                  src="/img/home/img4.png"
                  alt=""
                  width={710}
                  height={460}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="w-1.5 rounded-full bg-white">
              <div className="rounded-full bg-violet" id="scrollbar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
