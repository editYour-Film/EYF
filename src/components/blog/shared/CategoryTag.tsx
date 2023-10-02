import { forwardRef } from "react"

type CategoryTagProps = {
  article: any,
  className?: string
}

export const CategoryTag = forwardRef(function CategoryEl({article, className}:CategoryTagProps, ref:any) {
  return(
  <span 
    ref={ref}
    className={`${className} w-max bg-darkgrey px-4 py-2 rounded-full transition-colors hover:bg-primary-middle`}
  >
    {article.attributes.blog_category.data.attributes.category}
  </span>
  )
})