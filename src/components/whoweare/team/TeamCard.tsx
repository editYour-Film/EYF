import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import Image from "next/image";

import Linkedin from "@/icons/LinkedIn.svg";
import Github from "@/icons/GitHub.svg";

type TeamCardProps = {
  name: string;
  position: string;
  img: any;
  links?: { type: "linkedin" | "github"; link: string }[];
  className?: string;
};

export const TeamCard = ({
  name,
  position,
  img,
  links,
  className,
}: TeamCardProps) => {
  return (
    <SimpleCard
      className={`team-card flex flex-col justify-center items-center gap-padding-medium ${
        className ?? ""
      }`}
    >
      <div className="team-card__picture relative w-[128px] h-[128px] rounded-full overflow-hidden">
        <Image
          src={img.attributes.url}
          fill
          alt={img.attributes.alternativeText}
          className="team-card__picture-img z-10 padding-2"
        />
        <div className="absolute w-full h-full bg-rose-sunset z-0"></div>
      </div>

      <div className="team-card__title flex flex-col justify-center items-center text-center gap-dashboard-mention-padding-right-left">
        <div className="team-card__name text-dashboard-text-title-white-high text-title-small uppercase">
          {name}
        </div>
        <div className="team-card__position text-small text-dashboard-text-description-base">
          {position}
        </div>
      </div>

      {links && links.length > 0 && (
        <div className="tem-card__links flex gap-dashboard-specific-radius">
          {links.map((link, i) => {
            return (
              <a
                key={i}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[18px] h-[18px] svg-color-dashboard-icon-color-default hover:svg-color-soyMilk transition-colors duration-500"
              >
                {link.type === "linkedin" ? (
                  <Linkedin classname="w-full h-full" />
                ) : (
                  <Github classname="w-full h-full" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </SimpleCard>
  );
};
