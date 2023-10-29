import { Video as VideoType } from "@/components/model/videos"
import { Video } from "./Video"
import Image from 'next/image'
import { IslandButton } from "../buttons/IslandButton"

import Trash from '@/icons/trash.svg'
import { EditorVideo, modelType } from "@/components/dashboard/editor/_context/EditorContext"

export type ModelsProps = {
  video: EditorVideo,
  thumbnail?: string,
  model?: modelType,
  type?: 'default' | 'dashboard'
  handleModify?: () => void,
  handleDisable?: () => void,
  handleDelete?: () => void,
  handleSetHighlighted?: () => void,
}

export const ModelLarge = ({
  video, 
  type = 'default', 
  handleModify, 
  handleDisable,
  handleDelete, 
  handleSetHighlighted
}: ModelsProps) => {
  return (
    <>{video 
        ?
          <div className="model-large bg-dashboard-button-dark rounded-dashboard-button-separation-spacing overflow-hidden border">
            <div className="model-large__videoW relative w-full h-0 pb-[56.25%] bg-blackBerry z-0">
              <Video
                video={video.video}
                className='absolute object-cover'
              />
            </div>
            <div className="model-large__content relative p-padding-medium border-t z-10">
              <div className="model-large__infos w-full flex flex-row justify-between">
                {type === 'dashboard'
                  ?
                  <>
                    <div className="text-dashboard-text-title-white-high text-base font-medium">{video.title}</div>
                    <div className="text-dashboard-text-description-base">{video.length}</div>
                  </>
                  : 
                    <div className="">
                      <div className="w-[71px] h-[71px]">
                        <Image 
                          src={'/img/img.png'}
                          alt=''
                          fill
                        />
                      </div>
                      <div>
                        <div>{video.title}</div>
                        <div>par {video.user_info.f_name} {video.user_info.l_name}</div>
                      </div>
                    </div>
                }
              </div>

              <div className="model-large__buttons flex flex-row gap-dashboard-mention-padding-right-left mt-padding-medium">
                {handleModify && 
                  <IslandButton 
                    type='small'
                    label="Modifier"
                    onClick={() => { handleModify() }}
                    className="min-w-[120px] leading-none"
                  />
                }

                {handleDisable && 
                  <IslandButton 
                    type='small'
                    label="Retirer"
                    onClick={() => { handleDisable() }}
                    className="min-w-[120px] leading-none"
                  />
                }

                {handleSetHighlighted && 
                  <IslandButton 
                    type='small'
                    label="Changer le modèle en avant"
                    onClick={() => { handleSetHighlighted() }}
                    className="min-w-[120px] leading-none"
                  />
                }

                {handleDelete && 
                  <IslandButton 
                    type='small'
                    Icon={Trash}
                    onClick={() => { handleDelete() }}
                    className="ml-auto mr-0"
                  />
                }

              </div>

            </div>
          </div>
        :
          <></>
    }</>
  )
}