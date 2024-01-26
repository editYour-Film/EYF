import { useEffect, useState } from "react"
import { useObjectUrls } from "./useObjectUrls"
import { VIDEO_MIMES, AUDIO_MIMES, IMG_MIMES } from "@/const";

export function useGenerateThumbnailsFromFile(file: File) {
  const [img, setImg] = useState<string | null>(null)
  const objectsUrl = useObjectUrls()

  function generateThumbnailFromFile(file: File) {
    var src = objectsUrl(file!);
    
    if (VIDEO_MIMES.includes(file.type)) {
      var video = document.createElement('video');
      
      video.src = src;
      
      video.width = 360;
      video.height = 240;
      video.currentTime = 4;
      
      var canvas = document.createElement('canvas');
      canvas.width = 360; 
      canvas.height = 240;
      var context = canvas.getContext('2d');
      
      video.addEventListener('loadeddata', function() {
        context!.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImg(canvas.toDataURL('image/jpeg'))
      });
        
      } else if (IMG_MIMES.includes(file.type)) {
        setImg(src)
      } else if (AUDIO_MIMES.includes(file.type)) {
        setImg('/img/img.png')
      }
    }

    useEffect(() => {
      file && generateThumbnailFromFile(file)
    }, [file])

    return img
}