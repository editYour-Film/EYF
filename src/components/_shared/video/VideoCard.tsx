import { Video } from "@/components/model/videos"
import { secureUrl } from "@/utils/utils"

type VideoCardProps = {
  video: Video
}

export const VideoCard = ({video}:VideoCardProps) => {
  return (
    <video 
      className="absolute object-cover w-full h-full"
    >
      <source src={secureUrl(video.path)}/>
    </video>
  )
}