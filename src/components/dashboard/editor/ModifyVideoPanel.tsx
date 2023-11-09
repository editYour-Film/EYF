import {
  RefObject,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditorContext } from "./_context/EditorContext";
import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import { OverlayModel } from "@/components/_shared/UI/OverlayModel";
import { Video } from "@/components/_shared/video/Video";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import Trash from "@/icons/trash.svg";
import Resize from "@/icons/resize.svg";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ProfilPicture } from "../shared/ProfilPicture";
import Input from "@/components/_shared/form/Input";

import Frame from "@/icons/frame.svg";
import Headphones from "@/icons/headphones.svg";
import Barchart from "@/icons/bar-chart.svg";
import Mouse from "@/icons/mouse.svg";
import LinkIcon from "@/icons/link.svg";
import { Difficulty, Formats, Languages, Softwares } from "./data/metaValues";
import { DropBox } from "@/components/_shared/form/DropBox";

import Close from "@/icons/dashboard/x.svg";
import Plus from "@/icons/plus.svg";

import { Keyword } from "@/components/_shared/UI/Keyword";


export const ModifyVideoPanel = () => {
  const editorContext = useContext(EditorContext);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [descriptionEnabled, setDescriptionEnabled] = useState(false);
  const [titleEnabled, setTitleEnabled] = useState(false);

  const [openFrameToolbox, setOpenFrameToolbox] = useState(false);
  const [openLangToolbox, setOpenLangToolbox] = useState(false);
  const [openLinkToolbox, setOpenLinkToolbox] = useState(false);
  const [openWorktimeToolbox, setOpenWorktimeToolbox] = useState(false);
  const [openSoftwareToolbox, setOpenSoftwareToolbox] = useState(false);
  const [openTagToolbox, setOpenTagToolbox] = useState(false);

  const contentEl = useRef<HTMLDivElement>(null);
  const titleEl = useRef<HTMLDivElement>(null);

  const titleContent = (
    <div
      ref={titleEl}
      onClick={() => {
        !descriptionEnabled && setTitleEnabled(true);
      }}
      className="w-full"
    >
      <div
        className={`${
          titleEnabled ? "hidden" : ""
        } text-dashboard-text-description-base hover:text-dashboard-text-title-white-high cursor-pointer`}
      >
        {editorContext.modelTitle}
      </div>
      <Input
        className={`w-full ${titleEnabled ? "" : "hidden"}`}
        type="textarea"
        bg="black"
        value={editorContext.modelTitle}
        onChange={(e) => {
          editorContext.setModelTitle(e.target.value);
          editorContext.setCurrentModelHasBeenModified(true);
        }}
      />
    </div>
  );

  const videoContent = (
    <div
      ref={contentEl}
      onClick={() => {
        !descriptionEnabled && setDescriptionEnabled(true);
      }}
      className="relative"
    >
      <div
        className={`${
          descriptionEnabled ? "opacity-0 pointer-events-none" : ""
        } text-dashboard-text-description-base hover:text-dashboard-text-title-white-high cursor-pointer`}
      >
        {editorContext.modelDescription}
      </div>
      <div
        className={`absolute top-0 h-full w-full ${
          descriptionEnabled ? "" : "hidden"
        }`}
      >
        <Input
          type="textarea"
          bg="black"
          value={editorContext.modelDescription}
          onChange={(e) => {
            editorContext.setModelDescription(e.target.value);
            editorContext.setCurrentModelHasBeenModified(true);
          }}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutsideRef = (
      e: any,
      ref: RefObject<HTMLDivElement>,
      setter: Function
    ) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setter(false);
      }
    };

    const disableInteractiveInputs = (e: any) => {
      handleClickOutsideRef(e, contentEl, setDescriptionEnabled);
      handleClickOutsideRef(e, titleEl, setTitleEnabled);
    };

    if (editorContext.showModifyPanel) {
      window.addEventListener("click", disableInteractiveInputs);
    }

    return () => {
      window.removeEventListener("click", disableInteractiveInputs);
    };
  }, [editorContext.showModifyPanel]);

  return (
    <div className="modify-video fixed flex justify-center top-0 left-0 w-full h-full z-popup overflow-hidden pointer-events-none">
      <OverlayModel
        className="min-h-screen h-max"
        toggle={editorContext.showModifyPanel}
        onClose={() => {
          editorContext.hideModifyPanel();
        }}
        onClosed={() => {
          editorContext.setCurrentModelToModify(undefined);
        }}
      >
        <div className="modify-video__inner min-h-full p-dashboard-button-separation-spacing md:p-0 bg-dashboard-button-dark md:border-03 md:rounded-dashboard-button-separation-spacing grid grid-modify-video pb-[50px] overflow-hidden">
          {editorContext.currentModelToModify && (
            <>
              {isMobile && (
                <IslandButton
                  type="tertiary"
                  Icon={Close}
                  onClick={() => {
                    editorContext.hideModifyPanel();
                  }}
                  iconColor="appleRed"
                  className="ml-auto mr-0 w-max"
                />
              )}

              <div className="relative md:col-[main-start_/_main-end] row-[5_/_6] md:row-[1_/_2] h-0 pb-[56.25%] md:rounded-dashboard-button-separation-spacing overflow-hidden">
                <Video
                  video={editorContext.currentModelToModify.video}
                  className="absolute"
                />
              </div>

              <div className="modify-video__toolBox hidden md:flex flex-row items-stretch col-[main-start_/_main-end] row-[2_/_3] py-dashboard-specific-radius px-[50px] gap-dashboard-mention-padding-right-left border-b-05">
                <IslandButton
                  type={"small"}
                  Icon={Trash}
                  onClick={() => {
                    editorContext.currentModelToModify &&
                      editorContext.handleDeleteVideo(
                        editorContext.currentModelToModify.id
                      );
                  }}
                />

                <IslandButton
                  type={"small"}
                  label="Retirer"
                  onClick={() => {
                    editorContext.currentModelToModify &&
                      editorContext.handleDisableVideo(
                        editorContext.currentModelToModify.id
                      );
                  }}
                />

                <IslandButton
                  type={"small"}
                  Icon={LinkIcon}
                  label="Lien"
                  onClick={() => {
                    // Router push the link of the catalogue
                  }}
                />

                <IslandButton
                  type={"small"}
                  label="Mettre en avant ce model"
                  onClick={() => {
                    editorContext.currentModelToModify &&
                      editorContext.storeHighlightedVideo(
                        editorContext.currentModelToModify.id
                      );
                  }}
                />

                <IslandButton
                  type={"small"}
                  Icon={Resize}
                  onClick={() => {
                    editorContext.hideModifyPanel();
                  }}
                  className="ml-auto mr-0"
                />
              </div>

              <div className="modify-video__metaInfoW w-full md:col-[sidebar-start_/_sidebar-end] row-[3_/_4] md:row-[3_/_5] h-full md:pt-[60px] flex flex-col gap-dashboard-mention-padding-right-left overflow-hidden md:overflow-visible md:border-r-05">
                <div className="flex w-full md:flex-col overflow-scroll md:overflow-visible  gap-dashboard-mention-padding-right-left no-scroll-bar">
                  <div className="relative">
                    <ToolboxButton
                      Icon={Frame}
                      label={
                        editorContext.modelFormat
                          ? editorContext.modelFormat.length > 20
                            ? editorContext.modelFormat.slice(0, 16) + "..."
                            : editorContext.modelFormat
                          : "Ajoutez le format de la vidéo"
                      }
                      onClick={() => {
                        setOpenFrameToolbox(!openFrameToolbox);
                      }}
                    />
                    {!isMobile && (
                      <DropBox
                        type="simple"
                        Icon={Frame}
                        title="Format"
                        choices={Formats}
                        currentValue={editorContext.modelFormat}
                        onChange={(val) => {
                          editorContext.setModelFormat(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openFrameToolbox}
                        setToggle={(val) => {
                          setOpenFrameToolbox(val);
                        }}
                        className="hidden md:block absolute top-0 left-1/2"
                      />
                    )}
                  </div>

                  <div className="relative">
                    <ToolboxButton
                      Icon={Headphones}
                      label={
                        editorContext.modelAudio
                          ? editorContext.modelAudio.length > 20
                            ? editorContext.modelAudio.slice(0, 16) + "..."
                            : editorContext.modelAudio
                          : "Ajoutez le format de la vidéo"
                      }
                      onClick={() => {
                        setOpenLangToolbox(!openLangToolbox);
                      }}
                    />

                    {!isMobile && (
                      <DropBox
                        type="simple"
                        Icon={Headphones}
                        title="Langue"
                        choices={Languages}
                        currentValue={editorContext.modelAudio}
                        onChange={(val) => {
                          editorContext.setModelAudio(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openLangToolbox}
                        setToggle={(val) => {
                          setOpenLangToolbox(val);
                        }}
                        className="hidden md:block absolute top-0 left-1/2"
                      />
                    )}
                  </div>

                  <div className="relative">
                    <ToolboxButton
                      Icon={Barchart}
                      label={
                        editorContext.modelWorkTime
                          ? editorContext.modelWorkTime.length > 20
                            ? editorContext.modelWorkTime.slice(0, 16) + "..."
                            : editorContext.modelWorkTime
                          : "Ajoutez le format de la vidéo"
                      }
                      onClick={() => {
                        setOpenWorktimeToolbox(!openWorktimeToolbox);
                      }}
                    />

                    {!isMobile && (
                      <DropBox
                        type="simple"
                        Icon={Barchart}
                        title="Difficulté"
                        choices={Difficulty}
                        currentValue={editorContext.modelWorkTime}
                        onChange={(val) => {
                          editorContext.setModelWorkTime(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openWorktimeToolbox}
                        setToggle={(val) => {
                          setOpenWorktimeToolbox(val);
                        }}
                        className="hidden md:block absolute top-0 left-1/2"
                      />
                    )}
                  </div>

                  <div className="relative">
                    <ToolboxButton
                      Icon={Mouse}
                      label={
                        editorContext.modelSoftware
                          ? editorContext.modelSoftware.join(", ").length > 20
                            ? editorContext.modelSoftware
                                .join(", ")
                                .slice(0, 16) + "..."
                            : editorContext.modelSoftware.join(", ")
                          : "Ajoutez un logiciel"
                      }
                      onClick={() => {
                        setOpenSoftwareToolbox(!openSoftwareToolbox);
                      }}
                    />

                    {!isMobile && (
                      <DropBox
                        type="multiple"
                        Icon={Mouse}
                        title="Logiciels"
                        choices={Softwares}
                        currentValue={editorContext.modelSoftware}
                        onChange={(val) => {
                          editorContext.setModelSoftware(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openSoftwareToolbox}
                        setToggle={(val) => {
                          setOpenSoftwareToolbox(val);
                        }}
                        className="hidden md:block absolute top-0 left-1/2"
                      />
                    )}
                  </div>

                  <div className="relative">
                    <ToolboxButton
                      Icon={LinkIcon}
                      label={
                        <span className="text-blueBerry">
                          {editorContext.outLink
                            ? editorContext.outLink.length > 20
                              ? editorContext.outLink.slice(0, 16) + "..."
                              : editorContext.outLink
                            : "Ajoutez un Lien"}
                        </span>
                      }
                      onClick={() => {
                        setOpenLinkToolbox(!openLinkToolbox);
                      }}
                    />
                    {!isMobile && (
                      <DropBox
                        type="link"
                        placeholder="Entrez un nouveau lien..."
                        Icon={LinkIcon}
                        currentValue={editorContext.outLink}
                        onChange={(val) => {
                          editorContext.setOutLink(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openLinkToolbox}
                        setToggle={(val) => {
                          setOpenLinkToolbox(val);
                        }}
                        className="hidden md:block md:absolute md:top-0 md:left-1/2"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="modify-video__tags relative w-full flex flex-row md:flex-col gap-dashboard-mention-padding-right-left pr-dashboard-mention-padding-right-left py-dashboard-mention-padding-right-left overflow-scroll md:overflow-visible">
                    <div className="flex shrink-0 gap-[10px] pr-[20px] md:w-full items-center justify-between">
                      <div className="text-dashboard-text-description-base-low">
                        Mots-clés
                      </div>

                      <div
                        onClick={() => {
                          editorContext.setNewTag("");
                          setOpenTagToolbox(!openLinkToolbox);
                        }}
                        className="w-[25px] h-[25px] rounded-full p-1 bg-dashboard-button-dark border hover:border-dashboard-button-stroke-hover cursor-pointer"
                      >
                        <Plus />
                      </div>
                    </div>

                    {!isMobile && (
                      <DropBox
                        type="add"
                        placeholder="Nouveau Tag"
                        Icon={Plus}
                        currentValue={""}
                        onChange={(val) => {
                          editorContext.addTag(val);
                          editorContext.setCurrentModelHasBeenModified(true);
                        }}
                        toggle={openTagToolbox}
                        setToggle={(val) => {
                          setOpenTagToolbox(val);
                        }}
                        className="hidden md:block md:absolute md:top-0 md:left-1/2"
                      />
                    )}

                    {editorContext.tags && editorContext.tags.map((tag, i) => {                      
                      return (
                        <Keyword
                          key={i}
                          text={tag.name}
                          icon="cross"
                          className="relative w-ful shrink-0"
                          onClose={() => {
                            editorContext.setTags(editorContext.tags?.filter((t) => t !== tag))
                            editorContext.setCurrentModelHasBeenModified(true)
                          }}
                         />
                      )
                    })}
                  </div>                  
                </div>
              </div>

              <div className="modify-video__headline md:col-[content-start_/_content-end] row-[2_/_3] md:row-[3_/_4] align-self-auto md:py-dashboard-spacing-element-medium  md:pl-dashboard-spacing-element-medium flex flex-col gap-dashboard-spacing-element-medium">
                <div className="flex gap-dashboard-button-separation-spacing">
                  <div className="shrink-0">
                    <ProfilPicture />
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full text-title-medium n27 uppercase leading-none">
                      {" "}
                      {titleContent}{" "}
                    </div>
                    <div className="text-dashboard-text-description-base-low text-base">
                      Par {editorContext.currentModelToModify.user_info.f_name}
                      {editorContext.currentModelToModify.user_info.l_name}{" "}
                    </div>
                  </div>
                </div>

                {!isMobile && <div className="">{videoContent}</div>}
              </div>

              {isMobile && (
                <div className="modify-video__content md:col-[content-start_/_content-end] row-[6_/_7] align-self-auto ">
                  {isMobile && videoContent}
                </div>
              )}
            </>
          )}

          <div className="row-[7_/_8] md:row-[4_/_5] md:col-[content-start_/_content-end] flex flex-col gap-[39px] pb-[39px]">
            <IslandButton
              disabled={!editorContext.currentModelHasBeenModified}
              type="primary"
              label="Enregistrer"
              onClick={() => {
                editorContext.updateCurrentModel();
              }}
              className="relative w-max ml-auto mr-0 place-self-end"
            />

            {isMobile && (
              <IslandButton
                type="small"
                Icon={Trash}
                label="Supprimer le modèle"
                onClick={() => {
                  editorContext.currentModelToModify &&
                    editorContext.handleDeleteVideo(
                      editorContext.currentModelToModify.id
                    );
                }}
                className="relative w-max ml-auto mr-0 place-self-end"
              />
            )}
          </div>
        </div>
      </OverlayModel>

      {/* Dropboxs for mobile */}
      {isMobile && (
        <>
          <DropBox
            type="simple"
            Icon={Frame}
            title="Format"
            choices={Formats}
            currentValue={editorContext.modelFormat}
            onChange={(val) => {
              editorContext.setModelFormat(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openFrameToolbox}
            setToggle={(val) => {
              setOpenFrameToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="simple"
            Icon={Headphones}
            title="Langue"
            choices={Languages}
            currentValue={editorContext.modelAudio}
            onChange={(val) => {
              editorContext.setModelAudio(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openLangToolbox}
            setToggle={(val) => {
              setOpenLangToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="simple"
            Icon={Barchart}
            title="Difficulté"
            choices={Difficulty}
            currentValue={editorContext.modelWorkTime}
            onChange={(val) => {
              editorContext.setModelWorkTime(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openWorktimeToolbox}
            setToggle={(val) => {
              setOpenWorktimeToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="multiple"
            Icon={Mouse}
            title="Logiciels"
            choices={Softwares}
            currentValue={editorContext.modelSoftware}
            onChange={(val) => {
              editorContext.setModelSoftware(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openSoftwareToolbox}
            setToggle={(val) => {
              setOpenSoftwareToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="link"
            placeholder="Entrez un nouveau lien..."
            Icon={LinkIcon}
            currentValue={editorContext.outLink}
            onChange={(val) => {
              editorContext.setOutLink(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openLinkToolbox}
            setToggle={(val) => {
              setOpenLinkToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="add"
            placeholder="Nouveau Tag"
            Icon={Plus}
            currentValue={""}
            onChange={(val) => {
              editorContext.addTag(val);
              editorContext.setCurrentModelHasBeenModified(true);
            }}
            toggle={openTagToolbox}
            setToggle={(val) => {
              setOpenTagToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />
        </>
      )}
    </div>
  );
};

type ToolboxButtonProps = {
  Icon: any;
  label?: any;
  onClick: () => void;
};
const ToolboxButton = ({ Icon, label, onClick }: ToolboxButtonProps) => {
  return (
    <button
      onClick={() => {
        onClick && onClick();
      }}
      className="flex gap-[10px] justify-start text-dashboard-text-description-base p-dashboard-mention-padding-right-left hover:bg-dashboard-background-content-area"
    >
      <div>
        <Icon className="w-[24px] h-[24px] flex" />
      </div>
      {label && <div className="text-left w-max md:w-full">{label}</div>}
    </button>
  );
};
