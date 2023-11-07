import { useContext } from "react";

import { FileInput } from "./addModelFlow/FileInput";
import { InfosPan } from "./addModelFlow/InfosPan";
import { VisibilityPan } from "./addModelFlow/VisibilityPan";
import { EndPan } from "./addModelFlow/EndPan";
import { AddModelContext } from "./_context/AddModelContext";

type AddModelProps = {
  className?: string;
  step?: number;
};

export const AddModel = ({ className, step }: AddModelProps) => {
  return (
    <div className="addModel__content">
      <div className="relative z-20">
        <Switcher step={step} />
      </div>
    </div>
  );
};

type SwitcherProps = {
  step?: number;
};

const Switcher = ({ step }: SwitcherProps) => {
  const context = useContext(AddModelContext);

  let panel;
  switch (step ? step : context.currentStep) {
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
    default:
      panel = <></>;
  }

  return panel;
};
