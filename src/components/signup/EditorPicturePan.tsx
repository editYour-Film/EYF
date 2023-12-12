import { useContext, useEffect, useRef, useState } from "react";
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer";
import { SignUpContext } from "./_context/signupContext";
import { SimpleCard } from "../_shared/UI/CardSimple";
import { Button } from "../_shared/buttons/Button";
import Input from "../_shared/form/Input";
import { InfoMessage } from "../_shared/UI/InfoMessage";

import InfoIcon from "@/icons/info.svg";
import { GeneratedAvatar } from "../_shared/badges/GeneratedAvatar";
import { MentionInteraction } from "../_shared/buttons/MentionInteraction";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ProgressDots } from "../_shared/UI/ProgressDots";

export const EditorPicturePan = () => {
  const context = useContext(SignUpContext);
  const container = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const [mobileStep, setMobileStep] = useState<0 | 1>(0);
  const isMobile = useMediaQuery(`(max-width:500px`);

  const [imageToDisplay, setImageToDisplay] = useState<string | undefined>();

  useEffect(() => {
    context.entrance(container);
  }, []);

  const handleContinue = () => {
    if (isMobile && mobileStep === 0) {
      setMobileStep(1);
    } else {
      if (context.editorPictureOk && context.editorDescriptionOk)
        context.goNext();
    }
  };

  useEffect(() => {
    const file = fileInput.current?.files![0];

    if (file) setImageToDisplay(URL.createObjectURL(file));
  }, [context.editorPicture]);

  return (
    <div className="editor-picture__pan max-w-[100vw] w-[360px]">
      <SignInSignUpContainer ref={container}>
        <hr className="form-separator" />

        <div className="flex flex-col gap-dashboard-button-separation-spacing">
          <div className="text-large text-center">
            Complétez votre profil public
          </div>

          <InfoMessage
            message="Ces informations seront accessibles publiquement sur votre Profil Monteur.se."
            Icon={InfoIcon}
          />
        </div>

        <hr className="form-separator" />

        <SimpleCard className="text-center flex flex-col gap-dashboard-spacing-element-medium w-[900px] max-w-[100vw]">
          <div
            className={`flex items-stretch gap-dashboard-spacing-element-medium transition-transform ${
              isMobile && mobileStep === 1
                ? "-translate-x-[calc(100%+32px)]"
                : ""
            }`}
          >
            <div
              className={`${
                isMobile ? "basis-full shrink-0" : "basis-1/2 shrink-1"
              }`}
            >
              <div
                className="group flex flex-col gap-dashboard-spacing-element-medium items-center pointer-events-none"
                onClick={() => {
                  fileInput.current?.click();
                }}
              >
                <label htmlFor="avatar" className="absolute w-0 h-0 opacity-0">
                  Ajoutez votre photo de profil
                </label>
                <input
                  type="file"
                  id="avatar"
                  ref={fileInput}
                  value={context.editorPictureName || ""}
                  onChange={(e) => {
                    if (e.target.files) {
                      context.setEditorPictureName(e.target.value);
                      context.setEditorPicture(e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                  className="absolute w-0 h-0 opacity-0 pointer-events-none"
                />

                <div className="w-[145px] h-[145px]">
                  <GeneratedAvatar
                    label={context.initials}
                    className="pointer-events-auto"
                    img={imageToDisplay}
                  />
                </div>

                <MentionInteraction className="pointer-events-auto">
                  Ajoutez votre photo de profil
                </MentionInteraction>
              </div>
            </div>

            {!isMobile && (
              <div className="border-l border-l-dashboard-separator-white-low-opacity w-[0px]"></div>
            )}

            <div
              className={`${
                isMobile ? "basis-full shrink-0" : "basis-1/2 shrink-1"
              }`}
            >
              <Input
                type="textarea"
                bg="light"
                label="Présentez-vous à vos futurs clients..."
                placeholder="..."
                minlength={50}
                helpIconText=""
                value={context.editorDescription}
                onChange={(e) => {
                  context.setEditorDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </SimpleCard>

        <hr className="form-separator" />

        <div className="flex flex-col items-center w-full">
          <Button
            type="primary"
            label="Continuer"
            onClick={() => {
              handleContinue();
            }}
            disabled={
              !isMobile
                ? !(context.editorPictureOk && context.editorDescriptionOk)
                : false
            }
            className="w-full"
          />

          <MentionInteraction
            onClick={() => {
              context.goNext();
            }}
            className="mt-dashboard-mention-padding-right-left"
          >
            Passer
          </MentionInteraction>
        </div>

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  );
};
