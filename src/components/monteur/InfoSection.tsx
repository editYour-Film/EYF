import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import { videos } from "../data/videos";

export const InfoSection = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-between items-start mt-20">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-8 items-center justify-start">
            <div
              className="relative bg-cover bg-center w-32 h-32"
              style={{ backgroundImage: "url(/img/profile/avatar.png)" }}
            >
              <Image
                src="/icons/like.svg"
                width={44}
                height={44}
                alt="like"
                className="absolute bottom-0 right-0"
              />
            </div>
            <div>
              <H1>SEBASTIENSRN</H1>
              <p className="opacity-70 mt-2">Exerce depuis 2021</p>
              <p className="opacity-70 mt-1">
                20 personnes ont ajouté sebastien en favori
              </p>
            </div>
          </div>
          <p className="opacity-70 mt-10">
            Basé à Rennes en Bretagne, je prends plaisir depuis 2017 à
            accompagner des entreprises aux secteurs et profils très différents
            – mais qui souhaitent toutes raconter des histoires et toucher leur
            audience.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg">LANGUE</p>
            <div className="flex gap-4 mt-1">
              <p className="text-sm opacity-70">Français</p>
              <p className="text-sm opacity-70">• Français</p>
            </div>
          </div>

          <div>
            <p className="text-lg">SECTEUR D’ACTIVITÉ</p>
            <div className="flex gap-4 mt-1">
              <p className="text-sm opacity-70">Magazine</p>
              <p className="text-sm opacity-70">• Publicité TV</p>
            </div>
          </div>

          <div>
            <p className="text-lg">AUTRES</p>
            <div className="flex gap-4 mt-1">
              <p className="text-sm opacity-70">Da Vinci</p>
              <p className="text-sm opacity-70">• After effects</p>
            </div>
          </div>

          <AvailableNow />
        </div>
      </div>

      {videos && videos[0] && (
        <video className="rounded-3xl w-full mt-10" controls muted>
          <source src={videos[0].path} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

const AvailableNow = () => {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-2 bg-blackBerry bg-opacity-70 rounded-xl w-52">
      <span className="rounded-full bg-dashboard-success w-4 h-4"></span>
      <span className="opacity-80 text-sm font-medium">
        Disponible dès demain
      </span>
    </div>
  );
};
