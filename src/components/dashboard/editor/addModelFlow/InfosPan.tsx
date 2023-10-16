import { useUser } from "@/auth/authContext";
import {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import useStrapi from "@/hooks/useStrapi";
import Input from "@/components/_shared/form/Input";
import { Tag } from "@/components/_shared/UI/Tag";
import Button from "@/components/_shared/form/Button";
import { Help } from "@/components/_shared/form/Help";
import Image from "next/image";
import { VideoDuration, getDuration } from "@/utils/Video";
import slugify from "slugify";
import { checkAlphanumeric } from "../../../../utils/utils";
import { AddModelContext } from "../_context/AddModelContext";
import { InputVignet } from "@/components/_shared/form/InputVignet";

type InfosPanProps = {};

export const InfosPan = ({}: InfosPanProps) => {
  const context = useContext(AddModelContext);
  const user = useUser();

  const [entry, setEntry] = useState<any>(null);
  const [duration, setDuration] = useState<VideoDuration>();

  useEffect(() => {
    context.getCurrentStrapiObject();
  }, []);

  const form = useRef<HTMLFormElement>(null);
  const formatOption = [
    { value: "model 16/9 ème", label: "16/9ème" },
    { value: "model 9/16 ème", label: "9/16ème" },
    { value: "Mobile", label: "Mobile" },
    { value: "Carré", label: "Carré" },
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

  const [formatValue, setFormatValue] = useState(formatOption[0].value);
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

  useEffect(() => {
    if (context.strapiObject) {
      setEntry(context.strapiObject.attributes);
      setIsHighlightedValue(
        user[0].details.highlighted_video &&
          user[0].details.highlighted_video.data &&
          user[0].details.highlighted_video.data.id === context.strapiObject.id
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
          : context.defaultImage
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

    const data = {
      ...context.modifiedData,
      model: formatValue,
      title: titleValue,
      description: descriptionValue,
      thumbnail: vignet,
      tags: tags.length ? tags : undefined,
      user_info: user[0].details.id,
      is_highlighted: isHighlightedValue,
      length: duration
        ? duration?.min !== 0
          ? duration?.min.toString() + " minutes"
          : duration?.sec.toString() + " secondes"
        : "",
    };

    context.setModifiedData(data);
    context.setStep(2);
  };

  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
    const dur = getDuration(e.currentTarget);
    context.setVideoDuration(dur);
    setDuration(dur);
  };

  const handleAddTag = (e: any) => {
    const _tag = {
      name: e,
      slug: slugify(e, { lower: true }),
    };
    setTags([...tags, _tag]);
  };

  const handleRemoveTag = (e: any) => {
    const _tags = tags.filter((tag) => {
      return tag.slug !== slugify(e);
    });
    setTags(_tags);
  };

  const handleTitleChange = (e: any) => {
    //checkAlphanumeric(e.target.value, setTitleError);
    setTitleValue(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    //checkAlphanumeric(e.target.value, setDescriptionError);
    setDescriptionValue(e.target.value);
  };

  useEffect(() => {
    if (titleError || descriptionError || tagsError) setError(true);
    else setError(false);
  }, [titleError, descriptionError, tagsError]);

  return (
    <div className="infos-pan bg-black p-5 flex flex-col gap-8">
      <div className="info-pan__video-w relative h-0 pb-[32%] rounded-2xl overflow-hidden border">
        <video
          controls
          className="object-cover absolute h-full w-full"
          onLoadedMetadata={(e) => {
            handleLoadedMetadata(e);
          }}
        >
          {entry && (
            <source
              src={entry.video.data.attributes.url}
              type={entry.video.data.attributes.mime}
            />
          )}
        </video>
      </div>

      <div className="info-pan__title flex items-baseline gap-2">
        <div className="n27 text-lg font-medium">{entry?.title}</div>
        {duration && (
          <div className="n27 text-sm font-light">
            &#40;{duration?.min !== 0 && duration?.min.toString() + " minutes"}
            {duration?.sec.toString()}
            {duration?.min === 0 && " secondes"}&#41;
          </div>
        )}
      </div>

      <hr />

      <form ref={form} className="info-pan__format flex flex-col gap-8">
        <Input
          label="Mettre en avant"
          labelType="dashboard"
          type="switch"
          options={highlightedOptions}
          value={isHighlightedValue}
          selectedOption={isHighlightedValue}
          onChange={(e) => {
            setIsHighlightedValue(e);
          }}
        />

        <Input
          label="Format du modèle importé"
          labelType="dashboard"
          type="radio"
          options={formatOption}
          selectedOption={formatValue}
          value={formatValue}
          onChange={(e) => {
            setFormatValue(e);
          }}
        />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:basis-7/12 flex flex-col justify-stretch gap-8">
            <div>
              <Input
                label="Titre"
                labelType="dashboard"
                type="text"
                helpIconText="Entrez le titre"
                bg="light"
                value={titleValue}
                placeholder="Nom par défaut"
                onChange={(e) => {
                  handleTitleChange(e);
                }}
                maxlength={100}
              />
              {titleError && (
                <div className="text-error text-sm mt-2">{titleError}</div>
              )}
            </div>

            <div>
              <Input
                label="Description"
                type="textarea"
                labelType="dashboard"
                helpIconText="Entrez la description"
                bg="light"
                value={descriptionValue}
                placeholder="Présentez votre vidéo à vos spectateurs"
                onChange={(e) => {
                  handleDescriptionChange(e);
                }}
                maxlength={100}
              />
              {descriptionError && (
                <div className="text-error text-sm mt-2">
                  {descriptionError}
                </div>
              )}
            </div>
          </div>

          <div className="md:basis-5/12">
            <InputVignet
              label="Miniature"
              buttonLabel="Modifier la miniature"
              desc="Importez une image qui donne un aperçu du contenu de votre vidéo. Une bonne image se remarque et attire l'attention des spectateurs."
              image={defaultImage}
              onChange={(file) => {
                setVignet(file);
              }}
            />
          </div>
        </div>

        <KeyWords
          onChange={(e: any) => {
            handleAddTag(e);
          }}
        />
      </form>

      <div className="infos-pan__tag-container flex flex-wrap gap-2">
        {tags &&
          tags.length > 0 &&
          tags.map((tag: any, i: number) => {
            return (
              <Tag
                key={i}
                icon='cross'
                text={tag.name}
                onClose={() => {
                  handleRemoveTag(tag.slug);
                }}
              />
            );
          })}
      </div>

      <hr />

      <div className="flex justify-between items-center">
        <div>
          {error ? (
            <span className="text-error text-sm ">
              Le formulaire contient des erreurs
            </span>
          ) : (
            <span className="text-base-text text-sm ">
              Vérifications terminées. Aucun problème détecté.
            </span>
          )}
        </div>

        <Button
          variant="black"
          text="Suivant"
          icon="arrow-right"
          iconRight
          className={`w-max ${
            error ? "pointer-events-none opacity-10" : "bg-black opacity-50"
          }`}
          onClick={() => {
            !error && handleSubmit();
          }}
        />
      </div>
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
        bg="card"
        label="Référencement par mot clès"
        labelType="dashboard"
        helpIconText="help"
        roundedFull
        size="sm"
        iconRight
        className="rounded-full bg-background-card"
        placeholder="Rechercher"
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
