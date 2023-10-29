type CategoryBadgeProps = {
  category: string
}

export const CategoryBadge = ({category}:CategoryBadgeProps) => {
  let bgColor
  switch (category) {
    case 'Montage':
      bgColor = 'bg-edit'
      break;
  
    case 'Partenariat':
      bgColor = 'bg-partnership'
      break;
    case 'Tournage':
      bgColor = 'bg-filming'
      break;
    case 'Reseaux-sociaux':
      bgColor = 'bg-social-networks'
      break;
    case 'Television':
      bgColor = 'bg-television'
      break;
  
    default:
      bgColor = 'bg-edit'
      break;
  }

  return (
    <div className={`category-badge py-dashboard-button-separation-spacing px-[15px] rounded-full text-title-small n27 w-max text-dashboard-button-dark uppercase leading-none ${bgColor}`}>
      {category}
    </div>
  )
}