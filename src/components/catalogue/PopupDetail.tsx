import useMediaQuery from "@/hooks/useMediaQuery";
import { OverlayModel } from "../_shared/UI/OverlayModel"
import { Video } from "../_shared/video/Video";
import { CatalogContext } from "./_context/CatalogContext";
import React, { useContext } from "react";
import { ProfilPicture } from "../dashboard/shared/ProfilPicture";
import { ToolboxButton } from "../dashboard/editor/ModifyVideoPanel";

import Frame from "@/icons/frame.svg";
import Headphones from "@/icons/headphones.svg";
import Barchart from "@/icons/bar-chart.svg";
import Mouse from "@/icons/mouse.svg";
import Lock from "@/icons/lock.svg";
import Close from "@/icons/dashboard/x.svg";

import { Keyword } from "../_shared/UI/Keyword";
import { IslandButton } from "../_shared/buttons/IslandButton";

type PopupDetailProps = {
  trigger: boolean,
  onClose: () => void,
  onClosed: () => void
}

export const PopupDetail = ({trigger, onClose, onClosed}: PopupDetailProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const catalogContext = useContext(CatalogContext)

  return (
    <div className="popup-detail fixed flex justify-center top-0 left-0 w-full h-full z-popup pointer-events-none">
      <OverlayModel
        toggle={trigger}
        onClose={() => { onClose && onClose(); }}
        onClosed={() => { onClosed && onClosed(); }}
      >
        {catalogContext.detailModel &&
          <div className="popup-detail__inner min-h-full p-dashboard-button-separation-spacing md:p-0 bg-dashboard-button-dark md:border-03 md:rounded-dashboard-button-separation-spacing grid grid-modify-video pb-[50px]">
            <div className="relative md:col-[main-start_/_main-end] row-[5_/_6] md:row-[1_/_2] h-0 pb-[56.25%] md:rounded-dashboard-button-separation-spacing overflow-hidden">
              {catalogContext.detailModel.video.data && 
                <Video
                  video={catalogContext.detailModel.video.data.attributes}
                  className="absolute"
                />
              }
            </div>

            <div className="modify-video__toolBox hidden md:flex flex-row items-stretch col-[main-start_/_main-end] row-[2_/_3] py-dashboard-specific-radius px-[50px] gap-dashboard-mention-padding-right-left border-b-05">

            </div>

            <div className="modify-video__metaInfoW w-full md:col-[sidebar-start_/_sidebar-end] row-[3_/_4] md:row-[3_/_5] h-full md:pt-[60px] flex flex-col gap-dashboard-mention-padding-right-left overflow-hidden md:overflow-visible md:border-r-05">
              <div className="flex w-full md:flex-col overflow-scroll md:overflow-visible gap-dashboard-mention-padding-right-left no-scroll-bar">
                {catalogContext.detailModel.model && <ToolboxButton
                  Icon={Frame}
                  label={catalogContext.detailModel.model}
                />}

                {catalogContext.detailModel.visibility && <ToolboxButton
                  Icon={Lock}
                  label={catalogContext.detailModel.visibility}
                />}

                {catalogContext.detailModel.audio &&<ToolboxButton
                  Icon={Headphones}
                  label={catalogContext.detailModel.audio}
                />}
                
                {catalogContext.detailModel.worktime && <ToolboxButton
                  Icon={Barchart}
                  label={catalogContext.detailModel.worktime}
                />}

                {
                  catalogContext.detailModel.video_softwares.data && catalogContext.detailModel.video_softwares.data.length > 0 &&
                  <ToolboxButton
                    Icon={Mouse}
                    label={catalogContext.detailModel.video_softwares.data.map((el:any) => el.attributes.label).join(', ')}
                  />
                }
                
              </div>

              <div className="modify-video__tags relative w-full flex flex-row md:flex-col gap-dashboard-mention-padding-right-left pr-dashboard-mention-padding-right-left py-dashboard-mention-padding-right-left overflow-scroll md:overflow-visible">
                <div className="flex shrink-0 gap-[10px] pr-[20px] md:w-full items-center justify-between">
                  <div className="text-dashboard-text-description-base-low">
                    Mots-clés
                  </div>
                </div>

                {catalogContext.detailModel.video_tags.data.map(
                    (tag: any, i: number) => {
                      return (
                        <React.Fragment key={i} >
                          <Keyword
                            text={tag.attributes.name}
                            className="relative w-ful shrink-0"
                          />
                        </React.Fragment>
                      )
                    }
                  )
                }
              </div>
            </div>

            <div className="modify-video__headline md:col-[content-start_/_content-end] row-[2_/_3] md:row-[3_/_4] align-self-auto md:py-dashboard-spacing-element-medium md:pl-dashboard-spacing-element-medium flex flex-col gap-dashboard-spacing-element-medium"
            >
              <div className="flex gap-dashboard-button-separation-spacing">
                <div className="shrink-0">
                  <ProfilPicture user={catalogContext.detailModel.user_info.data.attributes} />
                </div>
                <div className="flex flex-col">
                  <div className="w-full text-title-medium n27 uppercase leading-none">
                    <div
                      className={`text-dashboard-text-description-base`}
                    >
                      {catalogContext.detailModel.title}
                    </div>
                  </div>
                  <div className="text-dashboard-text-description-base-low text-base">
                    Par {catalogContext.detailModel.user_info.data.attributes.f_name}{" "}
                    {catalogContext.detailModel.user_info.data.attributes.l_name}{" "}
                  </div>
                </div>

                {isMobile && (
                      <IslandButton
                        type="tertiary"
                        Icon={Close}
                        onClick={() => { catalogContext.setOpenDetailPanel(false)}}
                        iconColor="appleRed"
                        className="ml-auto mr-0 w-max"
                      />
                  )}
              </div>

              {!isMobile && 
                <div className="">
                  <div
                    className={`min-h-[100px] px-[20px] py-[12px] leading-[1.4] text-dashboard-text-description-base`}
                  >
                    {catalogContext.detailModel.description}
                  </div>
                </div>
              }
            </div>

            {isMobile && (
              <div className="modify-video__content md:col-[content-start_/_content-end] row-[6_/_7] align-self-auto ">
                  <div
                    className={`min-h-[100px] px-[20px] py-[12px] leading-[1.4] text-dashboard-text-description-base`}
                  >
                    {catalogContext.detailModel.description}
                  </div>
              </div>
            )}
          </div>
        }
    </OverlayModel>
  </div>
  )
}