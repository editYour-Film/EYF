import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Title } from "../typography/TitleAnim";
import { IslandButton } from "../buttons/IslandButton";

import { IslandButtonProps } from "../buttons/IslandButton";
import { useInView } from "react-intersection-observer";
import { appearBottomClassicContent } from "@/animations/appearBottom";

type ClassicContentProps = {
  suptitle?: string;
  suptitleClassName?: string;
  title: string;
  titleType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "none";
  titleClassName?: string;
  paragraph?: string;
  paragraphClassName?: string;
  cta?: string;
  ctaType?: IslandButtonProps["type"];
  ctaOnClick?: IslandButtonProps["onClick"];
  ctaHref?: IslandButtonProps["href"];
  ctaClassName?: string;
  className?: string;
  gap?: string;
};

export const ClassicContent = ({
  suptitle,
  suptitleClassName,
  title,
  titleType,
  titleClassName,
  paragraph,
  paragraphClassName,
  cta,
  ctaType,
  ctaOnClick,
  ctaHref,
  ctaClassName,
  className,
  gap,
}: PropsWithChildren<ClassicContentProps>) => {
  const ctx = useRef<gsap.Context>();
  const wrapper = useRef<HTMLDivElement>(null);
  const { ref: refInview, inView } = useInView({
    triggerOnce: true,
  });

  const suptitleRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);

  const [isSplitted, setIsSplitted] = useState(false);

  useEffect(() => {
    refInview(wrapper.current);
  }, []);

  useEffect(() => {
    ctx.current = appearBottomClassicContent({
      wrapper: wrapper.current,
      suptitle: suptitleRef.current,
      title: titleRef.current,
      parapgraph: paragraphRef.current,
      cta: ctaRef.current,
    });

    return () => {
      ctx.current && ctx.current?.revert();
    };
  }, [inView, isSplitted]);

  return (
    <div
      ref={wrapper}
      className={`flex flex-col ${
        gap ? "gap-" + gap : "gap-dashboard-spacing-element-medium"
      } ${className ?? ""}`}
    >
      {suptitle && (
        <div
          ref={suptitleRef}
          className={`cc__suptitle text-dashboard-text-description-base-low text-title-small leading-none ${suptitleClassName}`}
        >
          {suptitle}
        </div>
      )}

      <Title
        ref={titleRef}
        type={titleType}
        text={title}
        className={`${titleClassName ?? ""}`}
        split
        onSplitted={() => {
          setIsSplitted(true);
        }}
      />

      {paragraph && (
        <p
          ref={paragraphRef}
          className={`text-base text-dashboard-text-description-base ${
            paragraphClassName ?? ""
          }`}
        >
          {paragraph}
        </p>
      )}

      {cta && (
        <IslandButton
          ref={ctaRef}
          type={ctaType as IslandButtonProps["type"]}
          label={cta}
          enableTwist
          className={`cc__cta w-max ${ctaClassName ?? ""}`}
        />
      )}
    </div>
  );
};
