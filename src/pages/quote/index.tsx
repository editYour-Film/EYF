import Button from "@/components/_shared/form/Button";
import { H2 } from "@/components/_shared/typography/H2";
import LayoutQuote from "@/components/layouts/LayoutQuote";
import routes from "@/routes";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Duration() {
  const [duration, setDuration] = useState(10);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>
      <LayoutQuote step={1}>
        <div className="flex gap-4 md:gap-8 flex-col md:flex-row items-start justify-between">
          <div>
            <H2 arrow fake>Choisissez votre modèle de montage</H2>
            <p className=" opacity-70 mt-4 max-w-xl">
              Découvrez les vidéos de nos monteurs-réalisateur disponibles
              rapidement et choisissez le modèle qui correspond le mieux à vos
              attentes.
            </p>
          </div>
          <div className="md:text-right min-w-max">
            <p className=" opacity-70 text-lg">Plus de 20 minutes ?</p>
            <p className="text-violet mt-2 tex-lg">
              Demandez un devis personnalisé.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-44 relative">
          <input
            type="range"
            min={1}
            max={20}
            className="w-full"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
          <div className="flex mt-5">
            {[...Array(20)].map((x, index) => {
              return (
                <RangeLabel
                  key={x}
                  number={index + 1}
                  selectedValue={duration}
                />
              );
            })}
          </div>
          <p className="mt-3 ml-3 text-sm opacity-70">
            Jours de montage nécessaires
          </p>
        </div>

        <div className="flex gap-4 md:gap-8 flex-col md:flex-row items-start justify-between mt-8 md:mt-16">
          <div className="order-2 md:order-1 flex justify-between items-end gap-8 w-full md:w-auto">
            <Button
              variant="secondary"
              iconLeft
              icon="arrow-left"
              text="Retour"
            />
            <Link href={"#"} className="md:hidden">
              <Button
                variant="secondary"
                iconRight
                icon="arrow-right"
                text="Suivant"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-8 order-1 md:order-2 w-full md:w-auto">
            <span className="text-lg  text-white min-w-max">
              10 jours de montage : 453€
            </span>
            <Link href={"#"} className="hidden md:flex">
              <Button
                variant="secondary"
                iconRight
                icon="arrow-right"
                text="Suivant"
              />
            </Link>
          </div>
        </div>
      </LayoutQuote>
    </>
  );
}

type RangeLabelProps = {
  number: number;
  selectedValue: number;
};
const RangeLabel = ({ number, selectedValue }: RangeLabelProps) => {
  return (
    <div className="text-sm w-1/20 text-center relative">
      {selectedValue === number && (
        <div
          className="hidden md:flex pt-5 justify-center w-14 h-20 rounded-full text-white font-bold text-xs absolute -top-40 z-30 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url('/img/bg-range-value.svg')" }}
        >
          {number} mn
        </div>
      )}
      <span className="w-3 h-0.25 rotate-90 bg-white block mb-4 mx-auto"></span>
      {number}
    </div>
  );
};
