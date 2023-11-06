
export const EditButton = ({selected}:{selected:boolean}) => {
  return (
    <div className={`flex justify-center items-center w-[19px] h-[19px] rounded-full border-[2px] group-hover:border-soyMilk`}>
      {selected && 
        <div className="w-[11px] h-[11px] bg-blueBerry rounded-full"></div>
      }
    </div>
  )
}