import Link from "next/link";
import Button from "../_shared/form/Button";
import { H1 } from "../_shared/typography/H1";
import routes from "@/routes";

export const TopSection = () => {
  return (
    <div className="rounded-3xl border p-4 md:px-28 md:py-32 catalog-top-section-bg">
      <div className="max-w-xl">
        <H1 className="text-violet" textSize="text-2xl md:text-6xl">
          FIERS DE NOS MONTEUR.SES.
        </H1>
        <p className="mt-6 text-xl opacity-80">
          Découvrez les modèles de non monteur.ses disponibles et choisissez
          celui qui correspond le mieux à vos attentes.
          Puis accédez au devis depuis le modèle choisi et complétez les autres
          étapes.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-9 max-w-md">
          <Link href={routes.QUOTE_STEP1} className="md:w-1/2">
            <Button
              variant="primary"
              text="Créer ma video"
              className="w-full"
            />
          </Link>
          <Button
            variant="secondary"
            iconRight
            icon="arrow-right"
            text="Nos modèles"
            className="md:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};
