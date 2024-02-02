import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { QuoteContext } from "../../_context/QuoteContext";
import { VIDEO_MIMES, AUDIO_MIMES, IMG_MIMES } from "@/const";
import { useObjectUrls } from "@/hooks/useObjectUrls";
import Image from "next/image";
import { Video } from "@/components/_shared/video/Video";

export const useSetPreviewComponents = () => {
  const quoteContext = useContext(QuoteContext)
  const objectsUrl = useObjectUrls()
  const [previewComponents, setPreviewComponents] = useState<{id: number, comp:ReactElement}[]>([])

  useEffect(() => {
    // Set the preview of uploaded files
    let _previewComponents:{id: number, comp:ReactElement}[] = []
    quoteContext.uploadedFiles && quoteContext.uploadedFiles.forEach(async (file:File, i:number) => {
      if (VIDEO_MIMES.includes(file.type)) {
        const videoSrc = objectsUrl(file);

        _previewComponents.push(
          {
            id: Math.random(),
            comp: 
              <Video
                key={i}
                video={{url: videoSrc, name:file.name}}
                className="w-full h-full"
              />
          })
      } else if (IMG_MIMES.includes(file.type)) {
        const imgsrc = objectsUrl(file);
        _previewComponents.push(
          {
            id: Math.random(),
            comp: 
              <Image
                aria-hidden
                key={i}
                src={imgsrc}
                alt={file.name}
                fill
                className="w-full h-full object-cover"
              />
          })
      }
    });

    setPreviewComponents([..._previewComponents]);
  }, [quoteContext.uploadedFiles])

  return previewComponents
}