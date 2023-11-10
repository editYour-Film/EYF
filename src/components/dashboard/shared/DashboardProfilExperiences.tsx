import { Tag } from "@/components/_shared/UI/Tag";
import Input from "@/components/_shared/form/Input";
import {
  EditorProfilContext,
  EditorProfilContextProvider,
} from "../_context/ProfilContext";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useContext, useEffect, useState } from "react";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";

export const DashboardEditorProfilExperiences = () => {
  return (
    <div className="db-profil flex flex-col gap-dashboard-spacing-element-medium">
      <EditorProfilContextProvider>
        <ProfilExperience />
      </EditorProfilContextProvider>
    </div>
  );
};

const ProfilExperience = () => {
  return <InputsExperience />;
};

export const InputsExperience = () => {
  const context = useContext(EditorProfilContext);

  const [langOptions, setLangOptions] = useState<ReactElement[] | undefined>(
    []
  );
  const [skillsOptions, setSkillsOptions] = useState<
    ReactElement[] | undefined
  >([]);

  const generateLangOptions = () => {
    const options = [];

    if (context.langOptions)
      for (let i = 0; i < context.langOptions.length; i++) {
        const element = context.langOptions[i];
        options.push(
          <option value={element.id} className="text-black">
            {element.name}
          </option>
        );
      }

    return options;
  };

  const generateSkillsOptions = () => {
    const options = [];

    if (context.skillsOptions) {
      for (let i = 0; i < context.skillsOptions.length; i++) {
        const element = context.skillsOptions[i];
        options.push(
          <option value={element.id} className="text-black">
            {element.name}
          </option>
        );
      }
      console.log(context.skillsOptions);
    }

    return options;
  };

  useEffect(() => {
    setLangOptions(generateLangOptions());
    setSkillsOptions(generateSkillsOptions());
  }, [context.skillsOptions, context.langOptions]);

  return (
    <>
      <div>
        <Input
          type="select"
          bg="light"
          label="Rechercher une langue"
          onChange={(e) => {
            if (context.langOptions) {
              const lang = context.langOptions.find(
                (el) => el.id?.toString() === e.target.value?.toString()
              );
              if (lang) context.handleAddLang(lang);
            }
          }}
          className="relative z-20 bg-transparent"
          options={langOptions}
          placeholder="Sélectionnez les langues que vous parlez"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {context.spokenLanguages &&
          context.spokenLanguages.map((lang, i) => {
            return (
              <Tag
                bg="light"
                key={i}
                text={lang.name}
                onClose={() => {
                  context.handleRemoveLang(lang);
                }}
                icon="cross"
              />
            );
          })}
      </div>

      <div>
        <Input
          type="select"
          label="Ajouter une compétence"
          bg="light"
          onChange={(e) => {
            if (context.skillsOptions) {
              const skill = context.skillsOptions.find(
                (el) => el.id?.toString() === e.target.value.toString()
              );
              if (skill) context.handleAddSkill(skill);
            }
          }}
          className="relative z-10 bg-transparent"
          options={skillsOptions}
          placeholder="Sélectionnez vos compétences"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {context.skills &&
          context.skills.map((skill, i) => {
            return (
              <Tag
                bg="light"
                key={i}
                text={skill.name}
                onClose={() => {
                  context.handleRemoveSkill(skill);
                }}
                icon="cross"
              />
            );
          })}
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
