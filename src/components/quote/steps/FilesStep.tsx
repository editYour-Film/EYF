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

interface fileObject {
  file: File,
  name: string,
  duration: number
}

export const FilesStep = () => {
  const quoteContext = useContext(QuoteContext)
  const inputFile = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [uploadedFiles, setUploadedFiles] = useState<string | number | readonly string[] | undefined>(undefined)
  const [tempFiles, setTempFiles] = useState<File[]>([])

  const uploadedDuration = useRef(0)
  const [duration, setDuration] = useState(0)

  const [previewComponents, setPreviewComponents] = useState<{id: number, comp:ReactElement}[]>([])

  const RATIO_FILES_EDIT = 1.5

  useEffect(() => {
    let _previewComponents:{id: number, comp:ReactElement}[] = []

    tempFiles.forEach((file, i) => {
      // Get the video duration
      if (file.type === 'video/mp4') {
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);
        
        _previewComponents.push(
          {
            id: Math.random(),
            comp: 
              <Video 
                key={i}
                video={{url: video.src, name:file.name}} 
                onLoadedMetadata={() => {
                  window.URL.revokeObjectURL(video.src)
                  // uploadedDuration.current += video.duration
                              
                  setDuration(duration + video.duration)
                }}
                className="w-full h-full"
              />
          }
          )

      } else {
        uploadedDuration.current += 15
      }
    });
    
    quoteContext.setUploadedFiles(tempFiles)
    setPreviewComponents([..._previewComponents]);

  }, [tempFiles, duration])

  const handleChange = (files:FileList | null) => {
    files && setTempFiles([...tempFiles, ...files])
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

  const removeFromTempFiles = (file:File) => {
    setTempFiles([...tempFiles.filter((f) =>  f !== file)])
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
            <div className="text-dashboard-text-description-base">Durée totale des éléments de montage à télécharger : {totalLengthOfUploadedFiles()}</div>

          </div>

          <div className="flex flex-col md:flex-row border-t h-[33vh]">
            <div className="relative basis-1/2 min-h-[300px] shrink-0 flex flex-col justify-center items-center gap-[15px] p-dashboard-spacing-element-medium  overflow-hidden">
              <label htmlFor="quoteFiles" className="absolute w-full h-full visually-hidden">
                Sélectionner des fichiers
                <input
                  id="quoteFiles"
                  ref={inputFile}
                  type="file"
                  className="absolute w-full h-full visually-hidden"
                  multiple
                  value={uploadedFiles}
                  onChange={(e) => {
                    inputFile.current && handleChange(inputFile.current.files)
                    setUploadedFiles(e.target.value)
                  }}
                />
              </label>

              <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-20 pointer-events-none"></div>
              <div className="text-dashboard-text-description-base">Glissez-déposez mes documents ici</div>
              <IslandButton 
                type="tertiary"
                label="Accéder à mes fichiers"
                onClick={() => {}}
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
                          className={`bg-dashboard-background-content-area rounded-dashboard-button-square-radius ${i === 0 ? 'row-[1/3] overflow-hidden' : 'overflow-hidden'}`}>
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
                        className={`bg-dashboard-background-content-area ${i === 0 ? 'row-[1/3] overflow-hidden' : 'overflow-hidden'}`}
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