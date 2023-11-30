import slugify from "slugify"
import {useRouter} from 'next/router'
import routes from "@/routes"
import { toLastState, toRegular } from "@/store/slices/cursorSlice"
import { useDispatch } from "react-redux"
import store from "@/store/store"
import { useEffect } from "react"

type CategoryBadgeProps = {
  category: string,
  className?: string
}

export const CategoryBadge = ({category, className}:CategoryBadgeProps) => {
  const {push} = useRouter()
  const dispatch = useDispatch()

  let bgColor
  switch (slugify(String(category).toLowerCase())) {  
    case 'partenariat':
      bgColor = 'bg-partnership'
      break;
    case 'tournage':
      bgColor = 'bg-filming'
      break;
    case 'reseaux-sociaux':
      bgColor = 'bg-social-networks'
      break;
    case 'television':
      bgColor = 'bg-television'
      break;
    default:
      bgColor = 'bg-edit'
      break;
  }

  return (
    <button 
      className={`category-badge py-dashboard-button-separation-spacing px-[15px] rounded-full text-title-small n27 w-max text-dashboard-button-dark uppercase leading-none ${bgColor} focus-visible:outline-blueBerry opacity-50 hover:opacity-100 focus-visible:opacity-100 ${className}`}
      tabIndex={0}
      onClick={(e) => { 
        e.stopPropagation()
        push({ pathname: routes.BLOG_CATEGORY, query: { slug: category }});
      }}
      onMouseEnter={() => { dispatch(toRegular()) }}
      onMouseLeave={() => { 
        dispatch(toLastState(store.getState().cursor.lastState[1]))
      }}
    >
      {category}
    </button>
  )
}