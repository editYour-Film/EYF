import { useContext, useEffect } from "react";
import { QuoteContext } from "../../_context/QuoteContext";
import { VIDEO_MIMES, AUDIO_MIMES, IMG_MIMES } from "@/const";

export const useGetMediaDuration = (filesUploaded:File[] | undefined) => {
  const quoteContext = useContext(QuoteContext)
  type durationByType = {type: 'video' | 'audio' | 'image', dur: number}

  const IMG_DEFAULT_DURATION = 10

  const getduration:(file: File, onlyVisual?: boolean) => Promise<durationByType> = async (file, onlyVisual = false) => {
    const url = URL.createObjectURL(file);
    // Check if file is video or audio and get its duration
    // or set a default duration for imgs
    return new Promise((resolve) => {
      if (VIDEO_MIMES.includes(file.type)) {
        const video = document.createElement("video");
        video.muted = true;
        const source = document.createElement("source");
        source.src = url;
        video.preload= "metadata";
        video.appendChild(source);
        video.onloadedmetadata = function(){
          resolve({type: 'video', dur: video.duration})
        };
      } else if (AUDIO_MIMES.includes(file.type)) {
        if (!onlyVisual) {
          const audio = document.createElement("audio");
          audio.muted = true;
          const source = document.createElement("source");
          source.src = url;
          audio.preload= "metadata";
          audio.appendChild(source);
          audio.onloadedmetadata = function(){
            resolve({type: 'audio', dur: audio.duration})
          };
        }
      } else {
        resolve({type: 'image', dur: IMG_DEFAULT_DURATION})
      }
    });
  }

  const parseDurationByType = (durationTByTypeArr:durationByType[]) => {
    let audiosDuration = 0
    let videosDuration = 0
    let imagesDuration = 0

    let audiosNb = 0
    let videosNb = 0
    let imagesNb = 0

    durationTByTypeArr.forEach((item) => {
      switch(item.type) {
        case 'audio':
          audiosDuration += item.dur;
          audiosNb++;
          break;
        case 'video':
          videosDuration += item.dur;
          videosNb++;
          break;
        case 'image':
          imagesDuration += item.dur;
          imagesNb++;
          break;
      }
    })

    const vals = {
      // Durations by types
      audios: audiosDuration,
      videos: videosDuration,
      images: imagesDuration,
      visual: videosDuration + imagesDuration,
      all: audiosDuration + videosDuration + imagesDuration,
      // Number dy type
      audiosNb,
      videosNb,
      imagesNb,
      visualNb: videosNb + imagesNb,
      allNb: audiosNb + videosNb + imagesNb,
    }    

    return vals
  }

  useEffect(() => {
    const getFilesDuration = async () => {
      const durations = quoteContext.uploadedFiles ? await Promise.all(quoteContext.uploadedFiles.map((file:File) => getduration(file))) : undefined

      const parsedDuration = durations ? parseDurationByType(durations) : undefined

      if (parsedDuration) {
        quoteContext.setRushesDuration(parsedDuration.all / 60)
        quoteContext.setVideoRushsDuration(parsedDuration.videos / 60)
        quoteContext.setImagesRushsDuration(parsedDuration.images / 60)
        quoteContext.setAudioRushsDuration(parsedDuration.audios / 60)

        quoteContext.setImageRushsNumber(parsedDuration.imagesNb)
        quoteContext.setVideoRushsNumber(parsedDuration.videosNb)
        quoteContext.setAudioRushsNumber(parsedDuration.audiosNb)
      }
    }

    getFilesDuration()
  },[filesUploaded])
}