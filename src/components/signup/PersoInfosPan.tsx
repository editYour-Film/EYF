import { useContext, useEffect, useRef, useState } from "react";
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer";
import { SimpleCard } from "../_shared/UI/CardSimple";
import Input from "../_shared/form/Input";
import { InfoMessage } from "../_shared/UI/InfoMessage";

import { SignUpContext, userNameMessages } from "./_context/signupContext";
import { Button } from "../_shared/buttons/Button";
import { ProgressDots } from "../_shared/UI/ProgressDots";

import VideoIcon from "@/icons/signup/video.svg";
import SlidersIcon from "@/icons/signup/sliders.svg";

export const PersoInfosPan = () => {
  const context = useContext(SignUpContext);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    context.entrance(container);
  }, []);

  const handleGoToNext = () => {
    if (context.f_name && context.l_name && context.userNameAvailable) {
      context.goNext();
    }
  };

  return (
    <div className="persoInfo__pan max-w-[100vw] w-[424px]">
      <SignInSignUpContainer ref={container}>
        <div className="w-full flex flex-col items-center gap-dashboard-spacing-element-medium px-dashboard-specific-radius md:p-0">
          <hr className="form-separator" />

          <div className="text-large text-center">
            Commencez avec editYour.Film{" "}
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-dashboard-button-separation-spacing">
            {context.accountType &&
              ["creator", "both"].includes(context.accountType) && (
                <InfoMessage
                  message="Profil Créateur.rice"
                  Icon={VideoIcon}
                  small
                />
              )}
            {context.accountType === "both" && (
              <span className="hidden sm:block text-dashboard-text-description-base">
                &
              </span>
            )}
            {context.accountType &&
              ["editor", "both"].includes(context.accountType) && (
                <InfoMessage
                  message="Profil Monteur.se"
                  Icon={SlidersIcon}
                  small
                />
              )}
          </div>
          <hr className="form-separator" />
        </div>

        <SimpleCard
          paddingMobileSmall
          className="text-center flex flex-col gap-dashboard-spacing-element-medium"
        >
          <div>
            <div className="text-dashboard-text-title-white-high text-medium font-medium">
              Complétez vos informations personnelles
            </div>
            <div className="text-dashboard-text-description-base mt-dashboard-mention-padding-right-left">
              Seul votre nom d'utilisateur est public. Tous les monteurs
              inscrits sont répertoriés dans le catalogue avec leur nom
              d'utilisateur.
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-dashboard-button-separation-spacing">
            <Input
              type="text"
              bg="underlined"
              placeholder="Votre prénom"
              name="f_name"
              label="Renseignez votre prénom"
              noLabel
              className="font-medium text-base"
              value={context.f_name}
              onChange={(e) => {
                context.setF_name(e.target.value);
                context.setUsername(
                  (
                    (e.target.value.length > 0 ? e.target.value : "") +
                    (context.l_name ? "_" + context.l_name : "")
                  ).replace(/ /g, "_")
                );
                context.setUserNameAvailable(false);
                context.setUserNameMessage(userNameMessages.default);
              }}
              onBlur={() => context.handleUserNameVerification()}
            />

            <Input
              type="text"
              bg="underlined"
              placeholder="Votre nom"
              name="l_name"
              label="Renseignez votre nom de famille"
              noLabel
              className="font-medium text-base"
              value={context.l_name}
              onChange={(e) => {
                context.setL_name(e.target.value);
                context.setUsername(
                  (
                    (context.f_name ? context.f_name : "") +
                    (e.target.value.length > 0 ? "_" + e.target.value : "")
                  ).replace(/ /g, "_")
                );
                context.setUserNameAvailable(false);
                context.setUserNameMessage(userNameMessages.default);
              }}
              onBlur={() => context.handleUserNameVerification()}
            />

            <Input
              type="text"
              bg="underlined"
              placeholder="@nom_dutilisateur"
              name="username"
              label="Renseignez votre nom d'utilisateur"
              noLabel
              className={`font-medium text-base ${
                context.userNameAvailable ? "opacity-100" : "opacity-50"
              }`}
              textSunset
              value={context.username}
              onChange={(e) => {
                context.setUsername(e.target.value);
                context.setUserNameAvailable(false);
                context.setUserNameMessage(userNameMessages.default);
              }}
              onBlur={() => context.handleUserNameVerification()}
            />

            <InfoMessage
              wFull
              message={context.userNameMessage?.message}
              Icon={context.userNameMessage?.Icon}
            />
          </div>
        </SimpleCard>

        <hr className="form-separator" />

        <div className="w-full px-dashboard-specific-radius md:p-0">
          <Button
            type="primary"
            label="Valider"
            onClick={() => {
              handleGoToNext();
            }}
            disabled={
              !(context.f_name && context.l_name && context.userNameAvailable)
            }
            className="w-full"
          />
        </div>

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  );
};
