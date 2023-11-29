import { CategoryBadge } from "@/components/_shared/badges/CategoryBadges"
import { CardArticleType } from "../../dashboard/_context/DashBoardContext"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import ExternaLink from '@/icons/external-link.svg'
import { useRouter } from "next/router"
import dayjs from "dayjs"
import slugify from "slugify"
import { toRead, toRegular } from "@/store/slices/cursorSlice"
import { useDispatch } from "react-redux"
import routes from "@/routes"
import store from "@/store/store"

type CardArticle = {
  post: any,
  disableClick?: boolean,
  className?: string,
  smallGap?: boolean,
}

export const CardArticle = ({post, disableClick, smallGap, className}:CardArticle) => {
  const { push } = useRouter()  
  const category = post.blog_category && post.blog_category.data.attributes.category || post.category
  const dispatch = useDispatch()

  let bgColor
  switch (slugify(String(category).toLowerCase())) {
    case 'montage':
      bgColor = 'bg-edit-dark'
      break;
  
    case 'partenariat':
      bgColor = 'bg-partnership-dark'
      break;
    case 'tournage':
      bgColor = 'bg-filming-dark'
      break;
    case 'reseaux-sociaux':
      bgColor = 'bg-social-networks-dark'
      break;
    case 'television':
      bgColor = 'bg-television-dark'
      break;
  
    default:
      bgColor = 'bg-edit-dark'
      break;
  }

  return (
    <div 
      className={`dashboard-post group flex flex-col xl:flex-row justify-between gap-dashboard-spacing-element-medium ${smallGap ? '' : 'xl:gap-[19%]'} px-[53px] py-[61px] bg-dashboard-button-dark border rounded-dashboard-button-square-radius shadow-large transition-color duration-200 hover:border-dashboard-button-stroke-hover cursor-pointer focus-visible:outline-blueBerry focus-within:outline-blueBerry ${className ?? ''}`}
      tabIndex={0}

      onClick={() => {
        !disableClick && push({ pathname: routes.BLOG_DETAIL, query: { slug: post.slug } });
      }}
      onMouseOver={() => { !disableClick && store.getState().cursor.value !== 'read' && dispatch(toRead())}}
      onMouseLeave={() => { !disableClick && dispatch(toRegular())}}
    >
      
      <div className="shrink-0 dashboard-post__cover relative w-full xl:w-[294px] rounded-dashboard-button-separation-spacing  opacity-100 md:opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 overflow-hidden">

        <div className={`w-full h-full top-0 left-0 flex flex-col justify-center items-center py-dashboard-spacing-element-medium text-center gap-dashboard-button-separation-spacing ${bgColor}`}>
            
          <CategoryBadge category={category} />
          
          <div className="text-title-small leading-none uppercase n27 py-[10px]">
            <div>Écrit par</div>
            <div className="mt-dashboard-mention-padding-right-left">{post.author && post.author.name}</div>
          </div>

          <div className="text-dashboard-text-description-base text-title-small n27 uppercase leading-none">
            <div>Le {dayjs(post.updatedAt).locale("fr").format("DD MMMM, YYYY")}</div>
            {post.length && <div className="mt-dashboard-button-separation-spacing">{post.length} de lecture</div>}
          </div>

        </div>
      </div>

      <div className="dashboard-post__content basis-full grow flex flex-col gap-padding-medium w-full xl:basis-[384px]">
        <div className="max-w-[384px] text-title-m uppercase n27">{post.title}</div>
        <hr className="w-full border-05"/>
        <div className="max-w-[384px] text-dashboard-text-description-base md:text-dashboard-text-description-base-low text-base transition-color duration-200 group-hover:text-dashboard-text-description-base">{post.short_intro || post.excerpt}</div>
        
        <IslandButton
          type="tertiary"
          label="Lire la suite"
          Icon={ExternaLink}
          onClick={(e) => {
            e.stopPropagation();
            push(post.link)
          }}

          className="md:hidden"
        />
      </div>

    </div>
  )
}