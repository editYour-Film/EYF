import { useContext } from "react"
import { EditorContext } from "./_context/EditorContext"
import { ModelLarge } from "@/components/_shared/video/ModelLarge"


export const HightlightedVideo = ({}) => {
  const editorContext = useContext(EditorContext)
  
  if(editorContext.highlightedVideo) {
    return (
      <ModelLarge
        video={editorContext.highlightedVideo}
        type="editor"
  
        handleModify={() => { editorContext.handleModifyVideo(editorContext.highlightedVideo?.id) }}
        handleSetHighlighted={() => { editorContext.storeHighlightedVideo(editorContext.highlightedVideo?.id) }}
        handleDelete={() => { editorContext.handleDeleteVideo(editorContext.highlightedVideo?.id) }}
      />
    )
  } else {
    return <></>
  }
}