import Input from "@/components/_shared/form/Input";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AvatarInput } from "@/components/_shared/form/AvatarInput";
import { EditorProfilContext } from "../_context/ProfilContext";

import {
  UserNameInput,
  DescInput,
  PhoneInput,
  EmailInput,
  StreetInput,
  ZipCodeInput,
  CityInput,
} from "./profil/inputs";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../_context/DashBoardContext";
import { AuthContext } from "@/context/authContext";

export const DashboardEditorProfil = () => {
  const context = useContext(EditorProfilContext);
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext.isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="db-profil flex flex-col gap-dashboard-spacing-element-medium">
          <div className="db-profil__head">
            <div className="db-profil__infos flex flex-col justify-center sm:justify-start text-center sm:text-left items-center py-dashboard-spacing-element-medium gap-dashboard-spacing-element-medium">
              <div className="flex flex-col items-center gap-dashboard-spacing-element-medium">
                <AvatarInput
                  img={context.avatar}
                  onChange={(e: ChangeEvent) => {
                    context.handleAvatarChange(e);
                  }}
                  imgSize="w-[145px] h-[145px]"
                  label={dashboardContext.initials}
                />
              </div>

              <div className="n27 font-medium text-title-medium uppercase">
                {context.fName} {context.lName}
              </div>
            </div>
          </div>

          <Inputs />
        </div>
      )}
    </>
  );
};

export const Inputs = () => {
  const context = useContext(EditorProfilContext);
  const authContext = useContext(AuthContext);

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [dayOptions, setDayOptions] = useState<ReactElement[] | undefined>(
    undefined
  );

  const [monthOptions, setMonthOptions] = useState<ReactElement[] | undefined>(
    undefined
  );

  const [yearOptions, setYearOptions] = useState<ReactElement[] | undefined>(
    undefined
  );

  useEffect(() => {
    context.month &&
      setDayOptions(generateDayOptions(months.indexOf(context.month)));
  }, [context.month]);

  useEffect(() => {
    setDayOptions(generateDayOptions(0));
    setMonthOptions(generateMonthOptions());
    setYearOptions(generateYearOptions());
  }, []);

  const generateDayOptions = (monthIndex: number) => {
    const options = [];

    for (let i = 1; i <= days[monthIndex]; i++) {
      options.push(
        <option
          className="text-black"
          value={i.toString()}
          selected={context.day === i.toString()}
        >
          {i}
        </option>
      );
    }

    return options;
  };

  const generateMonthOptions = () => {
    const options = [];

    for (let i = 0; i < months.length; i++) {
      options.push(
        <option
          className="text-black"
          value={months[i]}
          selected={context.month ? context.month === months[i] : i === 0}
        >
          {months[i]}
        </option>
      );
    }

    return options;
  };

  const generateYearOptions = () => {
    const options = [];
    const actualYear = new Date().getFullYear();

    for (let i = 0; i < 120; i++) {
      options.push(
        <option
          className="text-black"
          value={actualYear - i}
          selected={
            context.year ? parseInt(context.year) === actualYear - i : i === 0
          }
        >
          {actualYear - i}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      <UserNameInput />

      <DescInput />

      <hr />

      <EmailInput />

      <PhoneInput />

      <div className="flex flex-col gap-dashboard-button-separation-spacing">
        <div className="text-small text-dashboard-text-description-base">
          Date de naissance
        </div>
        <div className="flex flex-row gap-dashboard-spacing-element-medium">
          <div className="basis-1/3">
            {dayOptions && (
              <Input
                type="select"
                name="Jour"
                bg="light"
                options={dayOptions}
                value={context.day}
                onChange={(e) => {
                  context.setDay(e.target.value);
                }}
                className="bg-transparent"
                placeholder="Jour"
              />
            )}
          </div>

          <div className="basis-1/3">
            {monthOptions && (
              <Input
                type="select"
                bg="light"
                name="Mois"
                options={monthOptions}
                value={context.month}
                onChange={(e) => {
                  context.setMonth(e.target.value);
                }}
                className="bg-transparent"
                placeholder="Mois"
              />
            )}
          </div>

          <div className="basis-1/3">
            {yearOptions && (
              <Input
                type="select"
                name="Année"
                bg="light"
                options={yearOptions}
                value={context.year}
                onChange={(e) => {
                  context.setYear(e.target.value);
                }}
                className="bg-transparent"
                placeholder="Année"
              />
            )}
          </div>
        </div>
      </div>

      <StreetInput />

      <div className="grid lg:grid-cols-2 gap-8">
        <CityInput />

        <ZipCodeInput />
      </div>

      <div className="flex items-center justify-end gap-dashboard-button-separation-spacing mt-auto md:mt-dashboard-spacing-element-medium mb-0">
        <MentionInteraction onClick={() => context.abort()} className="h-max">
          Annuler
        </MentionInteraction>

        <IslandButton
          type="primary"
          label="Enregistrer le profil"
          onClick={() => context.saveProfil()}
        />
      </div>
    </>
  );
};
