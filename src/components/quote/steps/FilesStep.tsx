import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { useContext, useEffect, useRef, useState } from "react";
import { QuoteContext } from "../_context/QuoteContext";
import { Video } from "@/components/_shared/video/Video";
import { ReactElement } from "react-markdown/lib/react-markdown";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import toast from "react-hot-toast";
import { formatVideoDuration } from "@/utils/utils";
import { Button } from "@/components/_shared/buttons/Button";

import VideoVignet from "@/icons/film.svg"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";
import Container from "@/components/_shared/UI/Container";
import { useObjectUrls } from "@/hooks/useObjectUrls";
import { useGenerateThumbnailsFromFile } from "@/hooks/useGenerateThumbnailFromFile";
import { VIDEO_MIMES, AUDIO_MIMES, IMG_MIMES } from "@/const";

export const FilesStep = () => {
  const quoteContext = useContext(QuoteContext)
  const inputFile = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const objectsUrl = useObjectUrls() 

  const [uploadedFiles, setUploadedFiles] = useState<string | number | readonly string[] | undefined>(undefined)
  const [tempFiles, setTempFiles] = useState<File[]>([])

  // Total duration of the rushes
  const [duration, setDuration] = useState(0)
  // Duration without audio
  const [visualRushesDuration, setVisualRushesDuration] = useState(0)

  const [previewComponents, setPreviewComponents] = useState<{id: number, comp:ReactElement}[]>([])

  // Open or close the library panel
  const [openLibrary, setOpenLibrary] = useState(false)

  // The ratio of the totale rushes / video duration
  const RATIO_FILES_EDIT = 5
  const MINIMUM_RUSHES_LENGTH = Math.max(quoteContext.selectedDuration, 1) * RATIO_FILES_EDIT

  const IMG_DEFAULT_DURATION = 15

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
    quoteContext.setUploadedFiles(tempFiles)
  }, [tempFiles])

  useEffect(() => {
    const getFilesDuration = async () => {
      const durations = quoteContext.uploadedFiles ? await Promise.all(quoteContext.uploadedFiles.map((file:File) => getduration(file))) : undefined

      const parsedDuration = durations ? parsDurationByType(durations) : undefined

      if (parsedDuration) {
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
    }

    getFilesDuration()

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
    inputFile.current!.value = ''
  }, [quoteContext.uploadedFiles])

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

    setTempFiles([...quoteContext.uploadedFiles, ..._files])
    inputFile.current!.value = ''
  }

  const removeFromTempFiles = (file:File) => {
    setTempFiles([...tempFiles.filter((f) =>  f !== file)])
    inputFile.current!.value = ''
  }

  return (
    <div className="files-step relative w-full flex flex-col items-center justify-center gap-dashboard-spacing-element-medium min-h-screen">
      <Container
        className="flex flex-col items-center justify-center gap-dashboard-spacing-element-medium"
      >
        <div className="flex flex-col items-center gap-dashboard-button-separation-spacing max-w-[600px]">
          <div className="text-large shadow-text text-center text-dashboard-text-title-white-high">Dernière étape, ajoutez vos fichiers</div>
          <div className="text-base shadow-text text-dashboard-text-description-base">Importez tous les fichiers vidéos, photos et sons nécessaires à la réalisation de votre film.</div>
        </div>

        <SimpleCard
          className="w-full p-0"
          noPadding
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center gap-[15px] p-dashboard-button-separation-spacing">
              <div
                className="basis-1/2 flex justify-center items-center p-dashboard-button-separation-spacing bg-dashboard-background-content-area border rounded-dashboard-button-square-radius"
              >
                <div className="flex flex-row items-center gap-dashboard-mention-padding-right-left text-dashboard-text-description-base">
                  <div>Minimum à importer</div><div className='text-title-medium text-dashboard-text-title-white-high'>{formatVideoDuration(MINIMUM_RUSHES_LENGTH * 60)}</div>
                </div>
              </div>
              <div
                className="basis-1/2 flex justify-center items-center p-dashboard-button-separation-spacing bg-dashboard-background-content-area border rounded-dashboard-button-square-radius"
              >
                <div className="flex flex-row items-center gap-dashboard-mention-padding-right-left text-dashboard-text-description-base">
                  <div>Médias importés</div><div className="text-title-medium text-dashboard-text-title-white-high">{ quoteContext.rushesDuration ? formatVideoDuration(visualRushesDuration * 60) : "00:00"}</div>
                </div>
              </div>
            </div>

            <div 
                data-lenis-prevent
                className="flex flex-col md:flex-row border-t h-[45vh] gap-[15px]">
              <div 
                className="relative basis-1/2 min-h-[300px] shrink-0 flex flex-col justify-center items-center gap-[15px] p-dashboard-spacing-element-medium overflow-scroll no-scroll-bar">
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
                <div className="flex flex-row gap-[15px]">
                  <IslandButton 
                    type="tertiary"
                    label="Accéder à mes fichiers"
                    onClick={() => {
                      inputFile.current && inputFile.current?.click()
                    }}
                  />
                  <IslandButton 
                    type="tertiary"
                    label="Musique libre de droits"
                    onClick={() => {}}
                  />
                </div>
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
              </div>
              
              <div className="relative basis-1/2 flex flex-col">
                <div 
                  data-lenis-prevent
                  className="grid grid-quote-files shrink-0 border-l h-full overflow-scroll no-scroll-bar">
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
                <Button 
                  className="absolute bottom-0 w-full h-[30px] text-center rounded-none" 
                  type="primary"
                  label={(!quoteContext.uploadedFiles || quoteContext.uploadedFiles.length === 0) ? "Aucun Média" : "Voir les Médias"}
                  onClick={() => { setOpenLibrary(true)}}
                  disabled={!quoteContext.uploadedFiles || quoteContext.uploadedFiles.length === 0}
                  Icon={VideoVignet}
                />
              </div>
            </div>
          </div>
        </SimpleCard>
      </Container>
      
      <div className={`absolute top-0 left-0 w-full h-full backdrop-blur z-[90] ${openLibrary ? 'opacity-100 visible' : 'opacity-0 invisible'} px-[80px] py-[50px]`}>
        <FileLibrary 
          isOpen={openLibrary}
          onClose={() => { setOpenLibrary(false)}}
        />
      </div>
    </div>
  )
}

type FileLibraryProps = {
  isOpen: boolean
  onClose: () => void
}

const FileLibrary = ({isOpen, onClose}: FileLibraryProps) => {
  const quoteContext = useContext(QuoteContext)
  const wrapper = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP(() => {
    gsap.set(wrapper.current, {
      y: window.innerHeight
    })
  }, {scope: wrapper})

  const open = contextSafe(() => {
    const tl = gsap.timeline()

    tl.to(wrapper.current, {
      y: 0,
      duration: 0.8,
      ease: 'expo.out'
    })
  })

  const close = contextSafe(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose && onClose()
      }
    })

    tl.to(wrapper.current, {
      y: window.innerHeight,
      duration: 0.5,
      ease: 'power2.in'
    })
  })

  useEffect(() => {
    if(isOpen) {
      open()
      quoteContext.setNextButtonDisabled(true)
      quoteContext.setPrevButtonDisabled(true)
    } else {
      quoteContext.defineNavStatus()
    }
  }, [isOpen])

  // Set the empty placeholder to complete a line of uploaded files
  const getPlaceholder = () => {
    const rest = quoteContext.uploadedFiles ? 4 - quoteContext.uploadedFiles.length % 4 : 0
    
    let ph = []
    if(rest > 0 && rest <= 4) {
      for (let i = 0; i < rest; i++) {
        ph.push(1)
      }
    }

    return ph
  }

  const placeholders = getPlaceholder()
  
  return (
    <div 
      data-lenis-prevent
      ref={wrapper}
      className={`quote__library w-full h-full`}>
        <ReactLenis
          className='overflow-scroll no-scroll-bar h-[calc(100vh-100px)]'
        >
          <div className="pt-[100px] pb-[100px]">
            <SimpleCard
              className="flex flex-col gap-dashboard-spacing-element-medium min-h-[70vh]"
            >
            <div
              className="flex flex-row justify-between">
              <div className="text-title-small text-title-white-high">Librairie des médias importés</div>
              <IslandButton 
                type="tertiary"
                label="Fermer"
                onClick={() => { close() }}
              />
            </div>
            <div className="grid grid-cols-4 gap-dashboard-spacing-element-medium">
              {
                quoteContext.uploadedFiles && quoteContext.uploadedFiles.map((file:File, i:number) => { 
                  return (
                    <LibraryElement 
                      key={i}
                      file={file} 
                    />
                  )
                })
              }
              {
                placeholders.map((_placeholder, i) => {
                  return (
                    <LibraryElement key={i} />
                  )
                })
              }
            </div>
            </SimpleCard>
          </div>
        </ReactLenis>
    </div>
  )
}

type LibraryElementProps = {
  file?: File,
}

const LibraryElement = ({file}:LibraryElementProps) => {
  const quoteContext = useContext(QuoteContext)
  const thumbnailUri = file ? useGenerateThumbnailsFromFile(file) : null

  return (
    <div
      className={`library-element relative h-0 pb-[77%] overflow-hidden ${file ? '' : 'bg-dashboard-background-content-area'} rounded-dashboard-button-square-radius`}>
        {file &&
          <div className="absolute top-0 left-0 w-full flex flex-col h-full gap-dashboard-button-separation-spacing">
            <div className="w-full relative basis-[70%]">
              {thumbnailUri && 
                <Image 
                  src={thumbnailUri}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              }
            </div>
            <div className="basis-[30%]">
              <div className="text-small text-dashboard-text-description-base">{file.name}</div>
              <div className="flex flex-col gap-dashboard-button-separation-spacing p-dashboard-button-separation-spacing">
                <hr className="w-full"/>
                <div className="flex flex-row justify-center gap-dashboard-button-separation-spacing">
                  <IslandButton
                    type="small"
                    label='Supprimer'
                    onClick={() => {
                      quoteContext.setUploadedFiles(quoteContext.uploadedFiles.filter((f:File) => f !== file))
                    }}
                    className="basis-1/2"
                  />
                  <IslandButton
                    type="small"
                    label='Retirer'
                    onClick={() => {}}
                    className="basis-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  )
}