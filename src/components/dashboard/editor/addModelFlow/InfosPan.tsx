import { useContext, useEffect, useRef, useState } from "react";

import useStrapi from "@/hooks/useStrapi";
import Input from "@/components/_shared/form/Input";
import { VideoDuration, getDuration } from "@/utils/Video";
import slugify from "slugify";
import { AddModelContext } from "../_context/AddModelContext";
import { InputVignet } from "@/components/_shared/form/InputVignet";
import { Keyword } from "@/components/_shared/UI/Keyword";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { Video } from "@/components/_shared/video/Video";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { Button } from "@/components/_shared/buttons/Button";
import { useMediaQuery } from "@uidotdev/usehooks";
import { AddModel } from "../AddModel";
import { FormatsType } from "../data/metaValues";

import Close from "@/icons/dashboard/x.svg";
import { AuthContext } from "@/context/authContext";
import validator from "validator";
import toast from "react-hot-toast";
import { inputErrors } from "@/const";
import Error from "@/icons/x-circle.svg";

type InfosPanProps = {};

export const InfosPan = ({}: InfosPanProps) => {
  const context = useContext(AddModelContext);
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [entry, setEntry] = useState<any>(null);
  const [duration, setDuration] = useState<VideoDuration>();

  useEffect(() => {
    dashboardContext.setButtons(
      <Button
        type="primary"
        label="Continuer"
        className={`w-full`}
        disabled={error}
        onClick={() => {
          !error && handleSubmit();
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

  const highlightedOptions = [
    {
      value: true,
      label: "oui",
    },
    {
      value: false,
      label: "non",
    },
  ];

  const [formatValue, setFormatValue] = useState<FormatsType>(
    formatOption[0].value
  );
  const [isHighlightedValue, setIsHighlightedValue] = useState(
    highlightedOptions[0].value
  );

  const [titleValue, setTitleValue] = useState<string | undefined>(undefined);
  const [titleError, setTitleError] = useState("");

  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(
    undefined
  );
  const [descriptionError, setDescriptionError] = useState("");

  const [defaultImage, setDefaultImage] = useState<string>("");
  const [vignet, setVignet] = useState<File | undefined>(undefined);

  const [tags, setTags] = useState<{ name: string; slug: string }[]>([]);
  const [tagsError, setTagsError] = useState("");

  const [error, setError] = useState(false);
  const [visibilityPanAdded, setVisibilityPanAdded] = useState(false);

  useEffect(() => {
    if (context.strapiObject) {
      setEntry(context.strapiObject.attributes);

      setIsHighlightedValue(
        authContext.user.details.highlighted_video &&
          authContext.user.details.highlighted_video.data &&
          authContext.user.details.highlighted_video.data.id ===
            context.strapiObject.id
          ? highlightedOptions[0].value
          : highlightedOptions[1].value
      );
      setFormatValue(
        context.strapiObject.attributes.model ?? formatOption[0].value
      );
      setTitleValue(context.strapiObject.attributes.title ?? undefined);
      setDescriptionValue(
        context.strapiObject.attributes.description ?? undefined
      );
      setDefaultImage(
        context.strapiObject.attributes.thumbnail.data
          ? context.strapiObject.attributes.thumbnail.data.attributes.url
          : undefined
      );
      setTags(
        context.strapiObject.attributes.video_tags?.data
          ? context.strapiObject.attributes.video_tags.data.map((tag: any) => {
              return { name: tag.attributes.name, slug: tag.attributes.slug };
            })
          : []
      );
    }
  }, [context.strapiObject]);

  const handleSubmit = () => {
    setDescriptionError("");
    setTagsError("");
    setTitleError("");

    if (context.title !== undefined && !validator.isEmpty(context.title)) {
      if (isMobile) context.setCurrentStep(2);
      else {
        setVisibilityPanAdded(true);

        dashboardContext.addPannel({
          title: "Details",
          panel: <AddModel step={2} />,
        });
      }
    } else context.setTitleError(inputErrors.required);
  };

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
      } else {
        setTagsError("6 tags maximum");
      }
    } else {
      context.setTags([_tag]);
    }
  };

  useEffect(() => {
    tagsError && context.tags && context.tags?.length < 6 && setTagsError("");
  }, [context.tags]);

  const handleRemoveTag = (e: any) => {
    const _tags = context.tags.filter((tag) => {
      return tag.slug !== slugify(e);
    });
    context.setTags(_tags);
  };

  useEffect(() => {
    if (titleError || descriptionError || tagsError) setError(true);
    else setError(false);
  }, [titleError, descriptionError, tagsError]);

  const areRequiredFieldsFilled = () => {
    if (context.tags?.length) {
      return (
        context.model &&
        context.title &&
        context.description &&
        context.description.split(" ").length >= 100 &&
        context.thumbnail &&
        context.tags.length > 0
      );
    }
    return false;
  };

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
      <div className="info-pan__video-w relative rounded-t-2xl overflow-hidden border">
        {entry && <Video playerFullWidth video={entry.video.data.attributes} />}
      </div>

      <div className="info-pan__title flex items-baseline gap-2">
        <div className="n27 text-title-medium text-dashboard-text-title-white-high uppercase font-medium">
          {entry?.video.data.attributes.title}
        </div>
      </div>

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
          {titleError && (
            <div className="text-appleRed text-sm mt-2">{titleError}</div>
          )}
        </div>

        <div>
          <Input
            label="Décrivez votre modèle de montage…"
            type="textarea"
            labelType="dashboard"
            helpIconText="Entrez la description"
            bg="light"
            value={context.description}
            placeholder="Présentez votre vidéo à vos spectateurs..."
            onChange={(e) => {
              context.setDescription(e.target.value);
            }}
            minlength={100}
            className="bg-transparent"
          />
          {descriptionError && (
            <div className="text-appleRed text-sm mt-2">{descriptionError}</div>
          )}
        </div>

        <KeyWords
          onChange={(e: any) => {
            handleAddTag(e);
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
                      handleRemoveTag(tag.slug);
                    }}
                  />
                );
              })}
          </div>
          {tagsError && <div className="text-appleRed">{tagsError}</div>}
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
          disabled={!areRequiredFieldsFilled() || error}
          onClick={() => {
            !error && handleSubmit();
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
