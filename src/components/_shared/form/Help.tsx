import Image from "next/image"

export const Help = ({text, label}: {text: string, label:string|undefined}) => {
  return (
    <div>
      <Image
        src="/icons/question.svg"
        height="21"
        width="21"
        alt={label ? label : 'help'}
        title={text}
      />
    </div>
  )
}