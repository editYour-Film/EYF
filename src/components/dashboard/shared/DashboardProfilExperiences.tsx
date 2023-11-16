import { Tag } from "@/components/_shared/UI/Tag";
import {
  EditorProfilContext,
  EditorProfilContextProvider,
} from "../_context/ProfilContext";
import { ReactElement, useContext, useEffect, useState } from "react";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { Select } from "@/components/_shared/form/Select";

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
            {element.label}
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
            {element.label}
          </option>
        );
      }
    }

    return options;
  };

  useEffect(() => {
    setLangOptions(generateLangOptions());
    setSkillsOptions(generateSkillsOptions());
  }, [context.skillsOptions, context.langOptions]);

  return (
    <>
      <Select
        label="Langue d'usage"
        onSelectOption={(val) => {
          if (context.langOptions) {
            const lang = context.langOptions.find(
              (el) => el.id === val
            );
            if (lang) context.handleAddUsedLang(lang);
          }
        }}
        list={context.langOptions}
        placeholder={context.usageLang?.label ?? "Sélectionnez votre langue d'usage"}
      />

      <Select
        label="Rechercher une langue"
        onSelectOption={(id) => {
          if (context.langOptions) {
            const lang = context.langOptions.find(
              (el) => el.id === id
            );
            if (lang) context.handleAddLang(lang);
          }
        }}
        list={context.langOptions}
        placeholder={"Sélectionnez les langues que vous parlez"}
      />

      {context.spokenLanguages && context.spokenLanguages.length > 0 &&
        <div key={Math.random()} className="flex gap-2 flex-wrap">
          {
            context.spokenLanguages.map((lang, i) => {
              return (
                <Tag
                  bg="light"
                  key={i}
                  text={lang.label}
                  onClose={() => {
                    context.handleRemoveLang(lang);
                  }}
                  icon="cross"
                />
              );
            })}
        </div>
      }

      <div>
        <Select 
          search
          placeholder="Sélectionnez ou ajoutez vos compétences"
          helperTop="Ajoutez jusqu’à 3 compétences maximum sur votre profil."
          label="Ajoutez vos compétences"
          list={context.skillsOptions}
          onAdd={(val) => {
            //TODO: Integration add a new tag from the val entered by the user
          }}
          onSelectOption={(val) => {
            if (context.skillsOptions) {              
              const skill = context.skillsOptions.find(
                (el) => {
                  return el.id === val
                }
              );
              if (skill) context.handleAddSkill(skill);
            }
          }}
        />

      </div>
      {(context.skills && context.skills.length > 0) &&
        <div key={Math.random()} className="flex gap-2 flex-wrap">
          {context.skills.map((skill, i: number) => {
            return (
              <Tag
                bg="light"
                key={i}
                text={skill.label}
                onClose={() => {
                  context.handleRemoveSkill(skill);
                }}
                icon="cross"
              />
            );
          })}
        </div>
      }
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
