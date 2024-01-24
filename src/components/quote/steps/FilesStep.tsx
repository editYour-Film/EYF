import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import Info from '@/icons/info.svg'
import { useContext, useEffect, useRef, useState } from "react";
import { QuoteContext } from "../_context/QuoteContext";
import { map } from "@/utils/Math";
import { Video } from "@/components/_shared/video/Video";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Keyword } from "@/components/_shared/UI/Keyword";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import toast from "react-hot-toast";

export const FilesStep = () => {
  const quoteContext = useContext(QuoteContext)
  const inputFile = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [uploadedFiles, setUploadedFiles] = useState<string | number | readonly string[] | undefined>(undefined)
  const [tempFiles, setTempFiles] = useState<File[]>([])

  // Total duration of the rushes
  const [duration, setDuration] = useState(0)
  // Duration without audio
  const [visualRushesDuration, setVisualRushesDuration] = useState(0)

  const [previewComponents, setPreviewComponents] = useState<{id: number, comp:ReactElement}[]>([])

  // The ratio of the totale rushes / video duration
  const RATIO_FILES_EDIT = 5
  const MINIMUM_RUSHES_LENGTH = quoteContext.selectedDuration * RATIO_FILES_EDIT
  const isMinimumRushLengthOk = MINIMUM_RUSHES_LENGTH - visualRushesDuration <= 0

  const IMG_DEFAULT_DURATION = 15

  const IMG_MIMES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/tiff',
    //eps
    'application/postscript',
    'image/x-eps',
    //psd
    'image/vnd.adobe.photoshop',
    'application/x-photoshop',
    'application/photoshop',
    'application/psd',
    'image/psd',
  ]
  const VIDEO_MIMES = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    // mts
    'video/mts',
    'video/avchd-stream',
    'application/metastream',
    'video/vnd.dlna.mpeg-tts',
    // mxf
    'application/mxf'
  ]
  const AUDIO_MIMES = [
    'audio/mpeg3',
    'audio/mpeg',
    'audio/wav',
    'audio/aac',
    'audio/aiff',
    'audio/mp4'
  ]

  type durationByType = {type: 'video' | 'audio' | 'image', dur: number}

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

  const parsDurationByType = (durationTByTypeArr:durationByType[]) => {
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
      const durations = await Promise.all(tempFiles.map(file => getduration(file)))

      const parsedDuration = parsDurationByType(durations)

      setDuration(parsedDuration.all / 60)
      setVisualRushesDuration(parsedDuration.visual / 60)
      
      quoteContext.setRushesDuration(parsedDuration.all / 60)
      quoteContext.setVideoRushsDuration(parsedDuration.videos / 60)
      quoteContext.setImagesRushsDuration(parsedDuration.images / 60)
      quoteContext.setAudioRushsDuration(parsedDuration.audios / 60)

      quoteContext.setImageRushsNumber(parsedDuration.imagesNb)
      quoteContext.setVideoRushsNumber(parsedDuration.videosNb)
      quoteContext.setAudioRushsNumber(parsedDuration.audiosNb)
    }

    getFilesDuration()

    // Set the preview of uploaded files
    let _previewComponents:{id: number, comp:ReactElement}[] = []
    tempFiles.forEach(async (file, i) => {
      if (VIDEO_MIMES.includes(file.type)) {
        const videoSrc = URL.createObjectURL(file);
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
        const imgsrc = URL.createObjectURL(file);
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
    
    quoteContext.setUploadedFiles(tempFiles)
    setPreviewComponents([..._previewComponents]);

  }, [tempFiles])

  // Get new files uploaded by the user
  const handleChange = (files:FileList | null) => {
    let _files:File[] = []
    files && Array.from(files).forEach(file => {
      if ([...AUDIO_MIMES, ...VIDEO_MIMES, ...IMG_MIMES].includes(file.type)) {
        _files.push(file)
      } else {
        toast(`Le format du fichier : ${file.name} n'est pas supporté`)
      }
    });

    setTempFiles([...tempFiles, ..._files])
    inputFile.current!.value = ''
  }

  const removeFromTempFiles = (file:File) => {
    setTempFiles([...tempFiles.filter((f) =>  f !== file)])
    inputFile.current!.value = ''
  }

  const getLenght = () => {
    return {
      min:  Math.trunc(quoteContext.selectedDuration * RATIO_FILES_EDIT),
      sec: map(0, 1, 0, 60, quoteContext.selectedDuration * RATIO_FILES_EDIT - Math.floor(quoteContext.selectedDuration * RATIO_FILES_EDIT)),
    }
  }

  const totalLengthOfUploadedFiles = () => {
    const l = getLenght()
    return `${l.min < 10 ? '0' + l.min : l.min }:${l.sec < 10 ? '0' + l.sec : l.sec}` 
  }

  return (
    <div className="files-step w-full flex flex-col items-center justify-center gap-dashboard-spacing-element-medium min-h-screen">
      <div className="flex flex-col items-center gap-dashboard-button-separation-spacing max-w-[600px]">
        <div className="text-large shadow-text text-center text-dashboard-text-title-white-high">Choisissez la durée de votre film</div>
        <InfoMessage
          Icon={Info}
          message='Glissez-déposez vos séquences vidéos, vos photos, vos fichiers audio, musiques ou commentaires.'
        />
      </div>

      <hr className="w-[360px]"/>
      <SimpleCard
        className="w-full p-0"
        noPadding
      >
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center gap-[15px] py-dashboard-spacing-element-medium">
            <div className="flex gap-[20px]">
              <IslandButton 
                type="tertiary"
                label="Musique libre de droits"
                onClick={() => {}}
              />
              <div className="flex flex-row w-max items-center">
                <Info className='shrink-0 w-[24px] h-[24px]' />
                <MentionInteraction
                  href="/" 
                  className="shrink-0"
                >
                  Plus d'infos
                </MentionInteraction>
              </div>
            </div>
            <div className="text-dashboard-text-description-base">Durée totale des éléments de montage à télécharger : <span className={`${isMinimumRushLengthOk ? 'text-dashboard-success' : 'text-appleRed'}`}>{totalLengthOfUploadedFiles()}</span></div>
          </div>

          <div 
              data-lenis-prevent
              className="flex flex-col md:flex-row border-t h-[33vh]">
            <div 
              className="relative basis-1/2 min-h-[300px] shrink-0 flex flex-col justify-start items-center gap-[15px] p-dashboard-spacing-element-medium overflow-scroll no-scroll-bar">
              <label htmlFor="quoteFiles" className="absolute w-full h-full top-0 left-0 visually-hidden cursor-pointer">
                Sélectionner des fichiers
                <input
                  id="quoteFiles"
                  ref={inputFile}
                  type="file"
                  className="absolute top-0 left-0 w-full h-full visually-hidden z-50 cursor-pointer"
                  multiple
                  value={uploadedFiles}
                  onChange={(e) => {
                    inputFile.current && handleChange(inputFile.current.files)
                  }}
                />
              </label>

              <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-20 pointer-events-none"></div>
              <div className="text-dashboard-text-description-base">Glissez-déposez mes documents ici</div>
              <IslandButton 
                type="tertiary"
                label="Accéder à mes fichiers"
                onClick={() => {
                  inputFile.current && inputFile.current?.click()
                }}
              />
              {
                isMobile &&
                <IslandButton 
                type="tertiary"
                label="Sélectionner des fichiers"
                onClick={() => {inputFile.current?.click()}}
              />
              }
              <ul className="text-dashboard-text-description-base-low text-small">
                <li>Vidéos : MP4, MOV, MTS, MXF, AVI</li>
                <li>Photos : JPEG, PNG, PSD, TIF, EPS</li>
                <li>Audio : WAV, MP3, AAC, AIFF, MP4</li>
              </ul>
              
              {
                tempFiles.length > 0 && 
                <div className="flex flex-row gap-[5px] flex-wrap z-30">
                  {tempFiles.length > 0 && tempFiles.map((file, i) => {
                    return (
                      <Keyword
                        key={i}
                        text={file.name}
                        icon="cross"
                        onClose={() => { removeFromTempFiles(file)}}
                      />
                    )
                  })}
                </div>
              }
            </div>

            <div 
              data-lenis-prevent
              className="basis-1/2 grid grid-quote-files shrink-0 border-l h-full overflow-scroll no-scroll-bar">
                {
                  previewComponents.length < 7 ?
                  <>
                    {Array.from({length: 7}).map((el, i) => {
                      return (
                        <div 
                          key={previewComponents[i] ? previewComponents[i].id : i}
                          className={`relative bg-dashboard-background-content-area rounded-dashboard-button-square-radius ${i === 0 ? 'row-[1/3] overflow-hidden' : 'overflow-hidden'}`}>
                          {previewComponents[i] ? previewComponents[i].comp : <></>}
                        </div>
                      )
                    })}
                  </>
                  :
                  previewComponents.map((component, i) => {
                    return (
                      <div
                        key={component.id}
                        className={`relative bg-dashboard-background-content-area ${i === 0 ? 'row-[1/3] overflow-hidden' : 'overflow-hidden'}`}
                      >
                        {component.comp}
                      </div>
                    )
                  })
                }
            </div>
          </div>
        </div>
      </SimpleCard>
    </div>
  )
}