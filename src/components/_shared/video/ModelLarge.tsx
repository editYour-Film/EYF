import { Video } from "./Video"
import Image from 'next/image'
import { IslandButton } from "../buttons/IslandButton"

import Trash from '@/icons/trash.svg'
import { EditorVideo, modelType } from "@/components/dashboard/editor/_context/EditorContext"
import { useEffect, useRef, useState } from "react"

export type ModelsProps = {
  video: EditorVideo,
  playerFullWidth?: boolean,
  thumbnail?: string,
  model?: modelType,
  type?: 'default' | 'editor' | 'creator',

  handleModify?: () => void,
  handleDisable?: () => void,
  handleEnable?: () => void,
  handleDelete?: () => void,
  handleSetHighlighted?: () => void,
  handleOpenDetail?: () => void,
}

export const ModelLarge = ({
  video, 
  thumbnail,
  playerFullWidth = false,
  type = 'default', 
  handleModify, 
  handleDisable,
  handleDelete, 
  handleSetHighlighted
}: ModelsProps) => {
  const [hover, setHover] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {    
    if (hover) {      
      videoRef.current && videoRef.current.play()
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
        setTimeout(() => { if (videoRef.current) videoRef.current.currentTime = 0 }, 500)
      }
    }
  }, [hover])
  
  return (
    <>{video 
        ?
          <div className="model-large bg-dashboard-button-dark rounded-dashboard-button-separation-spacing overflow-hidden border border-transparent">
            <div 
              className="model-large__videoW group relative w-full h-0 pb-[56.25%] bg-blackBerry z-0"
              onMouseOver={() => { 
                videoRef.current?.muted
                setHover(true) 
              }}
              onMouseLeave={() => { 
                setHover(false) 
              }}
            >
            {video.thumbnail ? (
              <Image 
                src={video.thumbnail.url} 
                alt={video.thumbnail.alternativeText}
                fill 
                className="object-cover group-hover:opacity-0 pointer-events-none transition-opacity duration-500 z-10"
                />
            ) : (
              <></>
            )}
              <Video
                ref={videoRef}
                playerFullWidth
                video={video.video}
                className='absolute object-cover z-0'
              />
            </div>
            <div className="model-large__content relative p-padding-medium border-t z-10">
              <div className="model-large__infos w-full flex flex-row justify-between">
                {type !== 'default'
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
                        <div>par {(video.user_info as any).data.attributes.f_name} {(video.user_info as any).data.attributes.l_name}</div>
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