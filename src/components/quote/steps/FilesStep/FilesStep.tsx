import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { useContext, useRef, useState } from "react";
import { QuoteContext } from "../../_context/QuoteContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import toast from "react-hot-toast";
import { formatVideoDuration } from "@/utils/utils";
import { Button } from "@/components/_shared/buttons/Button";

import VideoVignet from "@/icons/film.svg"
import Container from "@/components/_shared/UI/Container";
import { VIDEO_MIMES, AUDIO_MIMES, IMG_MIMES } from "@/const";
import { FilesLibrary } from "./FilesLibrary";
import { useGetMediaDuration } from "./useGetMediaDuration";
import { useSetPreviewComponents } from "./useSetPreviewComponents";

export const FilesStep = () => {
  const quoteContext = useContext(QuoteContext)
  const inputFile = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Update the different duration when upload files changes
  useGetMediaDuration(quoteContext.uploadedFiles)
  // Duration without audio
  const visualRushesDuration = (quoteContext.videoRushsDuration ?? 0) + (quoteContext.imagesRushsDuration ?? 0)

  // Generate an Image or video component when we update the uploaded files
  const previewComponents = useSetPreviewComponents()

  // Open or close the library panel
  const [openLibrary, setOpenLibrary] = useState(false)

  // The ratio of the totale rushes / video duration
  const RATIO_FILES_EDIT = 5
  const MINIMUM_RUSHES_LENGTH = Math.max(quoteContext.selectedDuration, 1) * RATIO_FILES_EDIT

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

    const fileList = quoteContext.uploadedFiles ? [...quoteContext.uploadedFiles, ..._files] : [..._files]
    quoteContext.setUploadedFiles(fileList)
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
        <FilesLibrary
          isOpen={openLibrary}
          onClose={() => { setOpenLibrary(false)}}
        />
      </div>
    </div>
  )
}