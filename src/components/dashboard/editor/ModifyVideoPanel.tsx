import React, { RefObject, useContext, useEffect, useRef, useState } from "react";
import {
  EditorContext,
  EditorVideo,
  video_tag,
} from "./_context/EditorContext";
import { OverlayModel } from "@/components/_shared/UI/OverlayModel";
import { Video } from "@/components/_shared/video/Video";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import Trash from "@/icons/trash.svg";
import Resize from "@/icons/resize.svg";
import { ProfilPicture } from "../shared/ProfilPicture";
import Input from "@/components/_shared/form/Input";

import Frame from "@/icons/frame.svg";
import Headphones from "@/icons/headphones.svg";
import Barchart from "@/icons/bar-chart.svg";
import Mouse from "@/icons/mouse.svg";
import LinkIcon from "@/icons/link.svg";
import Lock from "@/icons/lock.svg";

import { Formats, Worktime, Visibility } from "./data/metaValues";
import { DropBox } from "@/components/_shared/form/DropBox";

import Close from "@/icons/dashboard/x.svg";
import Plus from "@/icons/plus.svg";

import { Keyword } from "@/components/_shared/UI/Keyword";
import { AuthContext } from "@/context/authContext";
import toast from "react-hot-toast";
import GreenCheck from "@/icons/check-green.svg";
import { languages } from "@/const";
import useMediaQuery from "@/hooks/useMediaQuery";

type ModifyVideoPanelProps = {
  type: 'editor' | 'creator',
  context: any
}

export const ModifyVideoPanel = ({context, type}: ModifyVideoPanelProps) => {  
  const authContext = useContext(AuthContext);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isEditor] = useState(type === 'editor');

  const [descriptionEnabled, setDescriptionEnabled] = useState(false);
  const [titleEnabled, setTitleEnabled] = useState(false);

  const [openFrameToolbox, setOpenFrameToolbox] = useState(false);
  const [openVisibilityToolbox, setOpenVisibilityToolbox] = useState(false);
  const [openLangToolbox, setOpenLangToolbox] = useState(false);
  const [openLinkToolbox, setOpenLinkToolbox] = useState(false);
  const [openWorktimeToolbox, setOpenWorktimeToolbox] = useState(false);
  const [openSoftwareToolbox, setOpenSoftwareToolbox] = useState(false);
  const [openTagToolbox, setOpenTagToolbox] = useState(false);  
  const [openIndividualTagToolbox, setOpenIndividualTagToolbox] = useState<boolean[]>(context.currentModelToModify ? context.currentModelToModify!.video_tags.data.map(() => false) : []);

  const contentEl = useRef<HTMLDivElement>(null);
  const titleEl = useRef<HTMLDivElement>(null);  

  const titleContent = (
    <div
      ref={titleEl}
      onClick={() => {
        isEditor && !titleEnabled && setTitleEnabled(true);
      }}
      className="w-full"
    >
      <div
        className={`${
          titleEnabled ? "hidden" : ""
        } text-dashboard-text-description-base ${isEditor ? 'hover:text-dashboard-text-title-white-high cursor-pointer' : ''}`}
      >
        {context.modelTitle}
      </div>

      {isEditor && <Input
        className={`w-full ${titleEnabled ? "" : "hidden"}`}
        type="textarea"
        bg="black"
        value={context.modelTitle}
        onChange={(val) => {
          if (val) {
            context.setModelTitle(val.target.value);
            context.setCurrentModelHasBeenModified(true);
            context.setCurrentModelToModify(
              (previousState: EditorVideo) => ({
                ...previousState,
                title: val.target.value,
              })
            );
          }
        }}
      />}
    </div>
  );

  const videoContent = (
    <div
      ref={contentEl}
      onClick={() => {
        isEditor && !descriptionEnabled && setDescriptionEnabled(true);
      }}
      className="relative"
    >
      <div
        className={`min-h-[100px] px-[20px] py-[12px] leading-[1.4] ${
          descriptionEnabled ? "opacity-0 pointer-events-none" : ""
        } text-dashboard-text-description-base ${isEditor ? 'hover:text-dashboard-text-title-white-high cursor-pointer' : ''}`}
      >
        {context.modelDescription && context.modelDescription.length
          ? context.modelDescription
          : isEditor ? "Entrez une description pour votre vidéo" : ''}
      </div>
      
      {isEditor && 
        <div
          className={`absolute top-0 h-full w-full ${
            descriptionEnabled ? "" : "hidden"
          }`}
        >
          <Input
            type="textarea"
            bg="black"
            value={context.modelDescription}
            onChange={(val) => {
              if (val) {
                context.setModelDescription(val.target.value);
                context.setCurrentModelHasBeenModified(true);
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    description: val.target.value,
                  })
                );
              }
            }}
            className="min-h-[auto]"
          />
        </div>
      }
    </div>
  );

  const tags = (tag: video_tag, i: number) => {    
    if(!isEditor && !tag.approved) return <></>
    return (
      <React.Fragment
        key={i}
      >
        <Keyword
          text={tag.name}
          className="relative w-ful shrink-0"
          onClick={() => {
            isEditor && setOpenIndividualTagToolbox(context.currentModelToModify!.video_tags.data.map((el:any, j:number) => i === j ? true : false))
          }}
          isWaiting={!tag.approved}
        />
  
        {!isMobile && isEditor && <DropBox
          type="addRemove"
          placeholder="Nouveau Tag"
          Icon={Plus}
          currentValue={""}
          onChange={(val) => {
            context.setTagsError("");
            if (val) context.addTag(val);
          }}
          onDelete={() => {
            context.setCurrentModelToModify(
              (previousState: EditorVideo) => ({
                ...previousState,
                video_tags:
                {
                  data: context.currentModelToModify
                    ? context.currentModelToModify.video_tags?.data.filter(
                        (t: any) => t.name !== tag.name
                      )
                    : undefined,
                }
              })
            );
  
            context.setCurrentModelHasBeenModified(true)
          
          }}
          toggle={openIndividualTagToolbox[i]}
          setToggle={(val) => {
            context.setCurrentModelHasBeenModified(true);
            setOpenIndividualTagToolbox(context.currentModelToModify!.video_tags.data.map((el:any, j: number) => i === j ? val : false));
          }}
          className="hidden md:block md:absolute md:top-0 md:left-1/2"
        />}
      </React.Fragment>
    );
  }

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

    if (context.showModifyPanel || context.showDetailPanel) {
      window.addEventListener("click", disableInteractiveInputs);
    }

    return () => {
      window.removeEventListener("click", disableInteractiveInputs);
    };
    
  }, [context.showModifyPanel, context.showDetailPanel]);
    
  return (
    <div className="modify-video fixed flex justify-center top-0 left-0 w-full h-full z-popup pointer-events-none">
      <OverlayModel
        className="min-h-screen h-max"
        toggle={context.showModifyPanel || context.showDetailPanel}
        onOpened={() => {
          isEditor && context.setCurrentModelHasBeenModified(false);
        }}
        onClose={() => {
          if(isEditor) {
            context.hideModifyPanel();
            isEditor && context.setCurrentModelHasBeenModified(false);
          } else {
            context.hideDetailsPanel();
          }
        }}
        onClosed={() => {
          isEditor ? context.setCurrentModelToModify(undefined) : context.setCurrentDetailModel(undefined);
        }}
      >
        <div className="modify-video__inner min-h-full p-dashboard-button-separation-spacing md:p-0 bg-dashboard-button-dark md:border-03 md:rounded-dashboard-button-separation-spacing grid grid-modify-video pb-[50px]">
          {(context.currentModelToModify || context.currentDetailModel) && (
            <>
              {isMobile && (
                <IslandButton
                  type="tertiary"
                  Icon={Close}
                  onClick={() => {
                    isEditor ? context.hideModifyPanel() : context.hideDetailsPanel();
                  }}
                  iconColor="appleRed"
                  className="ml-auto mr-0 w-max"
                />
              )}

              <div className="relative md:col-[main-start_/_main-end] row-[5_/_6] md:row-[1_/_2] h-0 pb-[56.25%] md:rounded-dashboard-button-separation-spacing overflow-hidden">
                <Video
                  video={isEditor ? context.currentModelToModify.video.data.attributes : context.currentDetailModel.video.data.attributes}
                  className="absolute"
                />
              </div>

              <div className="modify-video__toolBox hidden md:flex flex-row items-stretch col-[main-start_/_main-end] row-[2_/_3] py-dashboard-specific-radius px-[50px] gap-dashboard-mention-padding-right-left border-b-05">
                <IslandButton
                  type={"small"}
                  Icon={Trash}
                  onClick={() => {
                    if(isEditor) {
                      context.currentModelToModify && context.handleDeleteVideo(context.currentModelToModify.id);
                    } else {
                      context.currentDetailModel && context.removeFromPicked(context.currentDetailModel.id);
                    }
                  }}
                />

                {isEditor && <IslandButton
                  type={"small"}
                  label="Retirer"
                  onClick={() => {
                    context.currentModelToModify &&
                      context.handleDisableVideo(
                        context.currentModelToModify.id
                      );
                  }}
                />}

                {!isEditor && <IslandButton
                  type={"small"}
                  label="Ajouter à un devis"
                  onClick={() => {
                    context.currentDetailModel &&
                      console.log('Ajouter un devis')
                  }}
                />}

                <IslandButton
                  type={"small"}
                  Icon={LinkIcon}
                  label={isEditor ? "Lien" : "Partager"}
                  onClick={() => {
                    if (context.currentModelToModify || context.currentDetailModel) {                      
                      const link = isEditor ? context.currentModelToModify?.video.data.attributes.url : context.currentDetailModel?.video.data.attributes.url
                      navigator.clipboard.writeText(
                        link
                      );
                      toast("Et hop dans le presse-papier", {
                        icon: GreenCheck,
                        duration: 5000,
                        className: "bg-blackBerry",
                      });
                    }
                  }}
                />

                {isEditor && <IslandButton
                  type={"small"}
                  label="Mettre en avant ce model"
                  onClick={() => {
                    context.currentModelToModify &&
                      context.storeHighlightedVideo(
                        context.currentModelToModify.id
                      );
                  }}
                />}

                <IslandButton
                  type={"small"}
                  Icon={Resize}
                  onClick={() => {
                    isEditor ? context.hideModifyPanel() : context.hideDetailsPanel();
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
                        context.modelFormat
                          ? context.modelFormat.length > 20
                            ? context.modelFormat.slice(0, 16) + "..."
                            : context.modelFormat
                          : "Ajoutez le format de la vidéo"
                      }
                      onClick={() => {
                        context.setCurrentModelHasBeenModified(false);
                        setOpenFrameToolbox(!openFrameToolbox);
                      }}
                      isEditor={isEditor}
                    />

                    {!isMobile && isEditor && (
                      <DropBox
                        type="simple"
                        Icon={Frame}
                        title="Format"
                        choices={Formats}
                        currentValue={context.modelFormat}
                        onChange={(val) => {
                          if (val) {
                            context.setModelFormat(val);
                            context.setCurrentModelToModify(
                              (previousState: EditorVideo) => ({
                                ...previousState,
                                model: val,
                              })
                            );
                          }
                        }}
                        toggle={openFrameToolbox}
                        setToggle={(val) => {
                          setOpenFrameToolbox(val);
                        }}
                        className="hidden md:block absolute top-0 left-1/2"
                      />
                    )}
                  </div>

                  {
                    isEditor &&
                    <div className="relative">
                      <ToolboxButton
                        Icon={Lock}
                        label={
                          context.modelVisibility
                            ? context.modelVisibility.length > 20
                              ? context.modelVisibility.slice(0, 16) + "..."
                              : context.modelVisibility
                            : "Définir la visibilité"
                        }
                        onClick={() => {
                          context.setCurrentModelHasBeenModified(false);
                          setOpenVisibilityToolbox(!openVisibilityToolbox);
                        }}
                        isEditor={isEditor}
                      />

                      {!isMobile && isEditor && (
                        <DropBox
                          type="simple"
                          Icon={Lock}
                          title="Visibilité"
                          choices={Visibility}
                          currentValue={context.modelVisibility}
                          onChange={(val) => {
                            if (val) {
                              context.setModelVisibility(val);
                              context.setCurrentModelToModify(
                                (previousState: EditorVideo) => ({
                                  ...previousState,
                                  visibility: val,
                                })
                              );

                              val;
                            }
                          }}
                          toggle={openVisibilityToolbox}
                          setToggle={(val) => {
                            setOpenVisibilityToolbox(val);
                          }}
                          className="hidden md:block absolute top-0 left-1/2"
                        />
                      )}
                    </div>
                  }

                  <div className="relative">
                    <ToolboxButton
                      Icon={Headphones}
                      label={
                        context.modelAudio
                          ? context.modelAudio.length > 20
                            ? context.modelAudio.slice(0, 16) + "..."
                            : context.modelAudio
                          : "Ajoutez la langue de la vidéo"
                      }
                      onClick={() => {
                        context.setCurrentModelHasBeenModified(false);
                        setOpenLangToolbox(!openLangToolbox);
                      }}
                      isEditor={isEditor}
                    />

                    {!isMobile && isEditor && (
                      <DropBox
                        type="simple"
                        Icon={Headphones}
                        title="Langue"
                        choices={languages}
                        currentValue={context.modelAudio}
                        onChange={(val) => {
                          if (val) {
                            context.setModelAudio(val);
                            context.setCurrentModelToModify(
                              (previousState: EditorVideo) => ({
                                ...previousState,
                                audio: val,
                              })
                            );
                          }
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
                        context.modelWorkTime
                          ? context.modelWorkTime === "base" ||
                            context.modelWorkTime === "Basique"
                            ? "Basique"
                            : context.modelWorkTime === "medium" ||
                              context.modelWorkTime === "Moyen"
                            ? "Moyen"
                            : (context.modelWorkTime === "high" ||
                                context.modelWorkTime ===
                                  "Très compliqué") &&
                              "Très compliqué"
                          : "Ajoutez le format de la vidéo"
                      }
                      onClick={() => {
                        context.setCurrentModelHasBeenModified(false);
                        setOpenWorktimeToolbox(!openWorktimeToolbox);
                      }}
                      isEditor={isEditor}
                    />

                    {!isMobile && isEditor && (
                      <DropBox
                        type="simple"
                        Icon={Barchart}
                        title="Difficulté"
                        choices={Worktime}
                        currentValue={context.modelWorkTime}
                        onChange={(val) => {
                          if (val) {
                            context.setModelWorkTime(val);

                            context.setCurrentModelToModify(
                              (previousState: EditorVideo) => ({
                                ...previousState,
                                worktime: val,
                              })
                            );
                          }
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
                        context.modelSoftwareArrayString &&
                        context.modelSoftwareArrayString.length > 0
                          ? context.modelSoftwareArrayString.join(", ")
                              .length > 20
                            ? context.modelSoftwareArrayString
                                .join(", ")
                                .slice(0, 16) + "..."
                            : context.modelSoftwareArrayString.join(", ")
                          : "Ajoutez un logiciel"
                      }
                      onClick={() => {
                        context.setCurrentModelHasBeenModified(false);
                        setOpenSoftwareToolbox(!openSoftwareToolbox);
                      }}
                      isEditor={isEditor}
                    />

                    {!isMobile && isEditor && (
                      <>
                        <DropBox
                          type="multiple"
                          Icon={Mouse}
                          title="Logiciels"
                          choices={
                            context.modelSoftwareOptionsArrayString
                          }
                          currentValue={context.modelSoftwareArrayString}
                          onChange={(val) => {
                            if (val) {
                              context.setModelSoftwareArrayString(val);
                              
                              let _video_softwares: any[] = [];
                              context.modelSoftwareOptions?.map((x:any) => {
                                if (val?.includes(x.attributes.label))                                
                                  _video_softwares.push(x);
                              });                              

                              context.setCurrentModelToModify(
                                (previousState: EditorVideo) => ({
                                  ...previousState,
                                  video_softwares: {
                                    data: _video_softwares
                                  },
                                })
                              );
                            }
                          }}
                          toggle={openSoftwareToolbox}
                          setToggle={(val) => {
                            setOpenSoftwareToolbox(val);
                          }}
                          className="hidden md:block absolute top-0 left-1/2"
                        />
                      </>
                    )}
                  </div>

                  <div className="relative">
                    <ToolboxButton
                      Icon={LinkIcon}
                      label={
                        <span className="text-blueBerry">
                          {context.outLink
                            ? context.outLink.length > 20
                              ? context.outLink.slice(0, 16) + "..."
                              : context.outLink
                            : "Ajoutez un Lien"}
                        </span>
                      }
                      onClick={() => {
                        context.setCurrentModelHasBeenModified(false);
                        setOpenLinkToolbox(!openLinkToolbox);
                      }}
                      isEditor={isEditor}
                    />
                    {!isMobile && isEditor && (
                      <DropBox
                        type="link"
                        placeholder="Entrez un nouveau lien..."
                        Icon={LinkIcon}
                        currentValue={context.outLink}
                        onChange={(val) => {
                          if (val) {
                            context.setOutLink(val);
                          }
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

                      {
                        (isEditor || (context.currentDetailModel.video_tags && context.currentDetailModel.video_tags.data.length > 0)) &&
                        <>
                          <div className="text-dashboard-text-description-base-low">
                            Mots-clés
                          </div>

                          {isEditor && 
                            <div
                              onClick={() => {
                                context.setCurrentModelHasBeenModified(false);
                                context.setNewTag("");
                                setOpenTagToolbox(!openLinkToolbox);
                              }}
                              className="w-[25px] h-[25px] rounded-full p-1 bg-dashboard-button-dark border hover:border-dashboard-button-stroke-hover cursor-pointer"
                            >
                              <Plus />
                            </div>
                          }
                        </>
                      }
                    </div>

                    {context.tagsError && (
                      <div className="text-appleRed">
                        {context.tagsError}
                      </div>
                    )}

                    {!isMobile && isEditor && (
                      <DropBox
                        type="add"
                        placeholder="Nouveau Tag"
                        Icon={Plus}
                        currentValue={""}
                        onChange={(val) => {
                          context.setTagsError("");
                          if (val) context.addTag(val);
                        }}
                        toggle={openTagToolbox}
                        setToggle={(val) => {
                          context.setCurrentModelHasBeenModified(true);
                          setOpenTagToolbox(val);
                        }}
                        className="hidden md:block md:absolute md:top-0 md:left-1/2"
                      />
                    )}

                    {isEditor && context.currentModelToModify.video_tags &&
                      context.currentModelToModify.video_tags.data.map(
                        (tag: any, i: number) => tags(tag.attributes, i)
                      )
                    }

                    {!isEditor && context.currentDetailModel.video_tags &&
                      context.currentDetailModel.video_tags.data.map(
                        (tag: any, i: number) => {
                          return tags(tag.attributes, i)}
                      )
                    }
                  </div>
                </div>
              </div>

              <div className="modify-video__headline md:col-[content-start_/_content-end] row-[2_/_3] md:row-[3_/_4] align-self-auto md:py-dashboard-spacing-element-medium md:pl-dashboard-spacing-element-medium flex flex-col gap-dashboard-spacing-element-medium">
                <div className="flex gap-dashboard-button-separation-spacing">
                  <div className="shrink-0">
                    <ProfilPicture user={isEditor ? context.currentModelToModify.user_info.data.attributes : context.currentDetailModel.user_info.data.attributes} />
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full text-title-medium n27 uppercase leading-none">
                      {titleContent}
                    </div>
                    <div className="text-dashboard-text-description-base-low text-base">
                      Par {isEditor ? authContext.user.details.f_name : context.currentDetailModel.user_info.data.attributes.f_name}{" "}
                      {isEditor ? authContext.user.details.l_name : context.currentDetailModel.user_info.data.attributes.l_name}{" "}
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
            {isEditor && 
              <IslandButton
                disabled={!context.currentModelHasBeenModified}
                type="primary"
                label="Enregistrer"
                onClick={() => {
                  context.updateCurrentModel();
                }}
                className="relative w-max ml-auto mr-0 place-self-end"
              />
            }

            {isMobile && isEditor && (
              <IslandButton
                type="small"
                Icon={Trash}
                label="Supprimer le modèle"
                onClick={() => {
                  context.currentModelToModify &&
                    context.handleDeleteVideo(
                      context.currentModelToModify.id
                    );
                }}
                className="relative w-max ml-auto mr-0 place-self-end"
              />
            )}
          </div>
        </div>
      </OverlayModel>

      {/* Dropboxs for mobile */}
      {isMobile && isEditor && (
        <>
          <DropBox
            type="simple"
            Icon={Frame}
            title="Format"
            choices={Formats}
            currentValue={context.modelFormat}
            onChange={(val) => {
              if (val) {
                context.setModelFormat(val);
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    model: val,
                  })
                );
              }
              context.setCurrentModelHasBeenModified(true);
            }}
            toggle={openFrameToolbox}
            setToggle={(val) => {
              setOpenFrameToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="simple"
            Icon={Lock}
            title="Visibilité"
            choices={Visibility}
            currentValue={context.modelVisibility}
            onChange={(val) => {
              if (val) {
                context.setModelVisibility(val);
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    visibility: val,
                  })
                );
              }
              context.setCurrentModelHasBeenModified(true);
            }}
            toggle={openVisibilityToolbox}
            setToggle={(val) => {
              setOpenVisibilityToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          <DropBox
            type="simple"
            Icon={Headphones}
            title="Langue"
            choices={languages}
            currentValue={context.modelAudio}
            onChange={(val) => {
              if (val) {
                context.setModelAudio(val);
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    audio: val,
                  })
                );
              }
              context.setCurrentModelHasBeenModified(true);
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
            choices={Worktime}
            currentValue={context.modelWorkTime}
            onChange={(val) => {
              if (val) {
                context.setModelWorkTime(val);
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    worktime: val,
                  })
                );
              }
              context.setCurrentModelHasBeenModified(true);
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
            choices={context.modelSoftwareOptionsArrayString}
            currentValue={context.modelSoftwareArrayString}
            onChange={(val) => {
              if (val) {
                context.setModelSoftwareArrayString(val);
                
                let _video_softwares: any[] = [];
                context.modelSoftwareOptions?.map((x:any) => {
                  if (val?.includes(x.attributes.label))                                
                    _video_softwares.push(x);
                });
                
                context.setCurrentModelToModify(
                  (previousState: EditorVideo) => ({
                    ...previousState,
                    video_softwares: {
                      data: _video_softwares
                    },
                  })
                );
              }
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
            currentValue={context.outLink}
            onChange={(val) => {
              if (val) {
                context.setOutLink(val);
              }
              context.setCurrentModelHasBeenModified(true);
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
              context.setTagsError("");
              if (val) context.addTag(val);
            }}
            toggle={openTagToolbox}
            setToggle={(val) => {
              context.setCurrentModelHasBeenModified(true);
              setOpenTagToolbox(val);
            }}
            className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
          />

          {context.currentModelToModify && context.currentModelToModify.video_tags &&
            context.currentModelToModify.video_tags.data.map(
              (tag: video_tag, i: number) => {
                return (
                  <React.Fragment
                    key={i}
                  >
                    <DropBox
                      type="addRemove"
                      placeholder="Nouveau Tag"
                      Icon={Plus}
                      currentValue={""}
                      onChange={(val) => {
                        context.setTagsError("");
                        if (val) context.addTag(val);
                      }}
                      onDelete={() => {
                        context.setCurrentModelToModify(
                          (previousState: EditorVideo) => ({
                            ...previousState,
                            video_tags:
                              context.currentModelToModify
                                ? context.currentModelToModify.video_tags.data?.filter(
                                    (t: any) => t.name !== tag.name
                                  )
                                : undefined,
                          })
                        );

                        context.setCurrentModelHasBeenModified(true)
                      
                      }}
                      toggle={openIndividualTagToolbox[i]}
                      setToggle={(val) => {
                        context.setCurrentModelHasBeenModified(true);
                        setOpenIndividualTagToolbox(context.currentModelToModify!.video_tags.data.map((el:any, j:number) => i === j ? val : false));
                      }}
                      className="fixed bottom-0 h-max z-20 md:hidden md:absolute md:top-0 md:left-1/2"
                    />
                  </React.Fragment>
                );
              }
            )}
        </>
      )}
    </div>
  );
};

type ToolboxButtonProps = {
  Icon: any;
  label?: any;
  onClick: () => void;
  isEditor?: boolean;
};
const ToolboxButton = ({ Icon, label, onClick, isEditor}: ToolboxButtonProps) => {
  return (
    <button
      onClick={() => {
        onClick && isEditor && onClick();
      }}
      // disabled={!isEditor}
      className={`flex gap-[10px] justify-start text-dashboard-text-description-base p-dashboard-mention-padding-right-left ${isEditor ? 'hover:bg-dashboard-background-content-area': ''}`}
    >
      <div>
        <Icon className="svg-color-dashboard-text-description-base w-[24px] h-[24px] flex" />
      </div>
      {label && <div className="text-left w-max md:w-full">{label}</div>}
    </button>
  );
};
