import { useContext, useEffect, useRef, useState } from "react";

import useStrapi from "@/hooks/useStrapi";
import Input from "@/components/_shared/form/Input";
import { VideoDuration } from "@/utils/Video";
import { AddModelContext } from "../_context/AddModelContext";
import { InputVignet } from "@/components/_shared/form/InputVignet";
import { Keyword } from "@/components/_shared/UI/Keyword";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { Video } from "@/components/_shared/video/Video";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { Button } from "@/components/_shared/buttons/Button";
import { useMediaQuery } from "@uidotdev/usehooks";
import { FormatsType } from "../data/metaValues";

import Close from "@/icons/dashboard/x.svg";

type InfosPanProps = {};

export const InfosPan = ({}: InfosPanProps) => {
  const context = useContext(AddModelContext);
  const dashboardContext = useContext(DashBoardContext);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    dashboardContext.setButtons(
      <Button
        type="primary"
        label="Continuer"
        className={`w-full`}
        onClick={() => {
          context.handleSubmitInfoPan();
        }}
      />
    );

    return () => {
      dashboardContext.setButtons(undefined);
    };
  }, []);

  const form = useRef<HTMLFormElement>(null);
  const formatOption = [
    { value: "model 16/9 ème" as FormatsType, label: "16/9ème" },
    { value: "model 9/16 ème" as FormatsType, label: "9/16ème" },
    { value: "Mobile" as FormatsType, label: "Mobile" },
    { value: "Carré" as FormatsType, label: "Carré" },
  ];

  const [defaultImage, setDefaultImage] = useState<string>("");

  /*
  const handleAddTag = (e: any) => {
    if (e.includes(" ")) {
      setTagsError("Les mots clés ne doivent pas contenir d'espaces.");
      return;
    }
    const _tag = {
      name: e,
      slug: slugify(e, { lower: true }),
    };

    if (context.tags) {
      if (context.tags.length < 6) {
        !context.tags.find((e) => e.slug === _tag.slug) &&
          context.setTags([...context.tags, _tag]);
      } else setTagsError("6 tags maximum");
    } else {
      context.setTags([_tag]);
    }
  };

  useEffect(() => {
    tagsError && context.tags && context.tags?.length < 6 && setTagsError("");
  }, [context.tags]);

  const handleRemoveTag = (e: any) => {
    const _tags = context.tags?.filter((tag) => {
      return tag.slug !== slugify(e);
    });
    context.setTags(_tags);
  };
*/

  useEffect(() => {
    context.getCurrentStrapiObject();
  }, []);

  return (
    <div className="infos-pan flex flex-col gap-dashboard-spacing-element-medium bg-dashboard-background-content-area pt-[50px] pb-[150px] md:py-0">
      {isMobile && (
        <IslandButton
          type="secondary"
          Icon={Close}
          iconColor="appleRed"
          onClick={() => {
            dashboardContext.setIsAddModelPannelOpen(false);
            context.setCurrentStep(undefined);
            context.abort();
          }}
          className="w-max self-end mr-dashboard-button-separation-spacing"
        />
      )}
      {context.strapiObject && (
        <>
          <div className="info-pan__video-w relative rounded-t-2xl overflow-hidden border">
            <Video
              playerFullWidth
              video={context.strapiObject.attributes.video.data.attributes}
            />
          </div>

          <div className="info-pan__title flex items-baseline gap-2">
            <div className="n27 text-title-medium text-dashboard-text-title-white-high uppercase font-medium">
              {context.strapiObject.attributes.video.data.attributes.title}
            </div>
          </div>
        </>
      )}

      <form
        ref={form}
        className="info-pan__format flex flex-col gap-dashboard-spacing-element-medium px-padding-medium md:px-0"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div tabIndex={-1}>
          <Input
            label="Format du modèle importé"
            labelType="dashboard"
            noLabel
            type="radio"
            options={formatOption}
            selectedOption={context.model}
            value={context.model}
            onChange={(e) => {
              context.setModel(e);
            }}
            className="bg-transparent"
          />
        </div>

        <div tabIndex={-1}>
          <Input
            label="Titre du modèle"
            labelType="dashboard"
            type="text"
            helpIconText="Entrez le titre"
            bg="light"
            value={context.title}
            placeholder="Choisir un titre..."
            onChange={(e) => {
              context.setTitle(e.target.value);
            }}
            className="bg-transparent"
            error={context.titleError}
          />
        </div>

        <div>
          <Input
            label="Décrivez votre modèle de montage…"
            type="textarea"
            labelType="dashboard"
            helpIconText="150 mots maximum."
            bg="light"
            value={context.description}
            placeholder="Présentez votre vidéo à vos spectateurs..."
            onChange={(e) => {
              context.setDescription(e.target.value);
            }}
            minlength={50}
            maxlength={150}
            className="bg-transparent"
            error={context.descriptionError}
          />
        </div>

        <KeyWords
          onChange={(e: any) => {
            //handleAddTag(e);
          }}
        />

        <div className="flex flex-col gap-1.5">
          <div className="infos-pan__tag-container flex flex-wrap gap-2">
            {context.tags &&
              context.tags.length > 0 &&
              context.tags.map((tag: any, i: number) => {
                return (
                  <Keyword
                    key={i}
                    icon="cross"
                    text={tag.name}
                    onClose={() => {
                      // handleRemoveTag(tag.slug);
                    }}
                  />
                );
              })}
          </div>
          {context.tagsError && context.tagsError.length > 0 && (
            <div className="text-appleRed">{context.tagsError}</div>
          )}
        </div>

        <InputVignet
          label="Ajoutez une miniature"
          buttonLabel="Ajouter un fichier"
          title="Glissez-déposez le fichier que vous souhaitez publier."
          desc="Importez une image qui donne un aperçu du contenu de votre vidéo. Une bonne image se remarque et attire l'attention des spectateurs."
          image={defaultImage}
          onChange={(file) => {
            context.setThumbnail(file);
          }}
          maxSize={1 * 1000 * 1000}
          allowedMimeType={[
            { mime: "image/png", name: "png" },
            { mime: "image/jpeg", name: "jpeg" },
            { mime: "image/jpg", name: "jpg" },
            { mime: "image/svg+xml", name: "svg" },
            { mime: "image/webp", name: "webp" },
          ]}
        />
      </form>

      {!isMobile && (
        <IslandButton
          type="primary"
          label="Confirmer"
          className={`w-max self-end`}
          onClick={() => {
            context.handleSubmitInfoPan();
          }}
        />
      )}
    </div>
  );
};

type keyWordsProps = {
  onChange: Function;
};

const KeyWords = ({ onChange }: keyWordsProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const listId = "TagList";
  const { data: strapiTags, mutate: getStrapiTags } = useStrapi(
    "video-tags",
    false
  );

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      onChange(e.target.value);
      setSearchValue("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getStrapiTags();
    }

    fetchData();
  }, []);

  return (
    <>
      <Input
        type="search"
        bg="light"
        label="Référencement par mot clès"
        labelType="dashboard"
        helpIconText="help"
        size="sm"
        iconRight
        className="rounded-full bg-background-card bg-transparent"
        placeholder="Ajoutez un mot-clé..."
        onChange={(e) => {
          handleChange(e);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        datalist={listId}
        value={searchValue}
      />

      {strapiTags && (
        <datalist id={listId}>
          {strapiTags.map((tag: any, i: number) => {
            return <option key={i} value={tag.attributes.name} />;
          })}
        </datalist>
      )}

      <input type="hidden" />
    </>
  );
};
