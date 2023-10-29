import { useContext } from "react"
import { DashBoardContext } from "../_context/DashBoardContext"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"

import Icon from '@/icons/Icon Frame.svg'
import routes from "@/routes"
import { useRouter } from "next/router"
import { DashBoardPost } from "./DashBoardPost"
import Image from "next/image"

export const NewsAndInfos = () => {
  const context = useContext(DashBoardContext)
  const router = useRouter()
  
  return (
    <div className="news-infos flex flex-col gap-dashboard-spacing-element-medium">
      <div className="news-infos__head flex flex-row justify-between px-dashboard-mention-padding-right-left md:px-0">
        <div className=" text-dashboard-text-title-white-high text-title-medium n27">NEWS & infos</div>
        <IslandButton
          type="tertiary"
          label="Blog"
          Icon={Icon}
          onClick={() => { router.push(routes.BLOG)}}
        />
      </div>

      {(context.infoCardActive && context.infoCard) &&
        <div className="dashboard-post group flex flex-col xl:flex-row items-center justify-between gap-dashboard-spacing-element-medium px-[53px] py-[61px] bg-dashboard-button-dark border rounded-dashboard-button-square-radius shadow-large transition-color duration-200">
          
          <div className="xl:basis-1/2 order-2 xl:order-1 flex flex-col gap-dashboard-specific-radius">
            <div className="text-large text-dashboard-text-title-white-high">{context.infoCard?.title}</div>
            <div className="text-dashboard-text-description-base text-base">{context.infoCard?.text}</div>
          </div>

          <div className="w-full hidden md:block order-1 xl:order-2 xl:basis-1/2">
            <div className="relative w-full h-0 pb-[88%]">
              <Image 
                src={context.infoCard?.img}
                alt=''
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      }


      <div className="news-infos__content flex flex-col gap-dashboard-spacing-element-medium">
        {(context.posts && context.posts.length > 0) && context.posts.map((post) => {
          return (
            <DashBoardPost post={post} />
          )
        })}
      </div>
    </div>
  )
}