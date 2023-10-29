import { useContext, useEffect, useState } from "react";

import { FileInput } from "./addModelFlow/FileInput";
import { InfosPan } from "./addModelFlow/InfosPan";
import { VisibilityPan } from "./addModelFlow/VisibilityPan";
import { EndPan } from "./addModelFlow/EndPan";
import { AddModelContext } from "./_context/AddModelContext";

type AddModelProps = {
  className?: string
};

export const AddModel = ({className}: AddModelProps) => {
  const context = useContext(AddModelContext);

  let panel;
  switch (context.currentStep) {
    case 0:
      panel = <FileInput />;
      break;
    case 1:
      panel = <InfosPan />;
      break;
    case 2:
      panel = <VisibilityPan />;
      break;
    case 3:
      panel = <EndPan />;
      break;
  }

  return (
    <div className={`${className}`}>
      <Steps currentStep={context.currentStep} />
      <div className="addModel__content relative rounded-3xl mt-12 p-5 border overflow-hidden">
        <div
          className={`addModel__bg absolute top-0 left-0 w-full h-full z-0 ${
            [0, 3].includes(context.currentStep)
              ? "bg-alphaWhite bg-opacity-10"
              : "bg-black"
          }`}
        ></div>

        <div className="relative z-20">{panel}</div>
      </div>
    </div>
  );
};

const Steps = ({}: { currentStep: number }) => {
  const context = useContext(AddModelContext);

  return (
    <div className="steps flex justify-between">
      <div className="steps__title n27 text-2xl">Ajouter un modèle</div>
      <div className="steps__steps relative">
        <div className="flex relative justify-between gap-10 z-10">
          <Step index={0} title="Importer la vidéo" />
          <Step index={1} title="Informations" />
          <Step index={2} title="Visibilité" />
          {context.currentStep === 3 && (
            <div className="px-4 flex bg-black rounded-full justify-center items-center border">
              Modèle enregistré
            </div>
          )}
        </div>
        <div className="absolute z-0 w-full left-0 top-1/2 -translate-y-1/2 border-t"></div>
      </div>
    </div>
  );
};

const Step = ({ index, title }: { index: number; title: string }) => {
  const context = useContext(AddModelContext);
  const [isActive, setIsActive] = useState(index === context.currentStep);

  useEffect(() => {
    setIsActive(index === context.currentStep);
  }, [context.currentStep]);

  return (
    <div
      className={`step flex justify-between items-center ${
        context.currentStep === 3 ? "" : "gap-[10px]"
      } pr-[15px] w-max bg-black rounded-full border`}
    >
      <div
        className={`step-number rounded-full n27 w-7 h-7 flex justify-center items-center ${
          context.currentStep === 3 ? "bg-[#858585]" : "gap-[10px]"
        } ${isActive ? "bg-violet text-white" : "bg-white text-black"}`}
      >
        {index + 1}
      </div>
      <div className="step-title">{context.currentStep === 3 ? "" : title}</div>
    </div>
  );
};
