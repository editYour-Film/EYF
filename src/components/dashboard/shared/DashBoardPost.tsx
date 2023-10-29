import { CategoryBadge } from "@/components/_shared/badges/CategoryBadges"
import { dashboardPostType } from "../_context/DashBoardContext"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import ExternaLink from '@/icons/external-link.svg'
import { useRouter } from "next/router"
type DashBoardPost = {
  post: dashboardPostType
}

export const DashBoardPost = ({post}:DashBoardPost) => {
  const router = useRouter()

  let bgColor
  switch (post.category) {
    case 'Montage':
      bgColor = 'bg-edit-dark'
      break;
  
    case 'Partenariat':
      bgColor = 'bg-partnership-dark'
      break;
    case 'Tournage':
      bgColor = 'bg-filming-dark'
      break;
    case 'Reseaux-sociaux':
      bgColor = 'bg-social-networks-dark'
      break;
    case 'Television':
      bgColor = 'bg-television-dark'
      break;
  
    default:
      bgColor = 'bg-edit-dark'
      break;
  }

  return (
    <div 
      className="dashboard-post group flex flex-col xl:flex-row justify-between gap-dashboard-spacing-element-medium px-[53px] py-[61px] bg-dashboard-button-dark border rounded-dashboard-button-square-radius shadow-large transition-color duration-200 hover:border-dashboard-button-stroke-hover cursor-pointer"
      onClick={() => {
        
      }}
    >
      
      <div className="dashboard-post__cover relative  w-full xl:w-[294px] rounded-dashboard-button-separation-spacing opacity-50 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden">
        
        <div className={`w-full h-0 pb-[70%] ${bgColor}`}></div>

        <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center text-center gap-dashboard-button-separation-spacing">
            
            <CategoryBadge category={post.category} />
            
            <div className="text-title-small uppercase n27 py-[10px]">Écrit par<br/>{post.author}</div>

            <div className="text-dashboard-text-description-base text-title-small n27 uppercase leading-none">
              <div>Le {post.date}</div>
              <div className="mt-dashboard-button-separation-spacing">{post.length} de lecture</div>
            </div>

          </div>
      </div>

      <div className="dashboard-post__content flex flex-col gap-padding-medium w-full xl:basis-[384px]">
        <div className="text-title-m uppercase n27">{post.title}</div>
        <hr className="border-05"/>
        <div className="text-dashboard-text-description-base-low text-base transition-color duration-200 group-hover:text-dashboard-text-description-base">{post.excerpt}</div>
        
        <IslandButton
          type="tertiary"
          label="Lire la suite"
          Icon={ExternaLink}
          onClick={(e) => {
            e.stopPropagation();
            router.push(post.link)
          }}

          className="md:hidden"
        />
      </div>

    </div>
  )
}