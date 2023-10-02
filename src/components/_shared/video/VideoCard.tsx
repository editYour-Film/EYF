import { Video } from "@/components/model/videos"

type VideoCardProps = {
  video: Video
}

export const VideoCard = ({video}:VideoCardProps) => {
  return (
    <video 
      className="absolute object-cover w-full h-full"
    >
      <source src={video.path}/>
    </video>
  )
}