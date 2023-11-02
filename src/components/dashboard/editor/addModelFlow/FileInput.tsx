import { useRef, useContext, useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/auth/authContext";
import useStrapi, { useStrapiPost } from "@/hooks/useStrapi";

import Upload from "@/icons/dashboard/upload.svg";
import Warning from "@/icons/dashboard/alert-octagon.svg";
import { TitleSvgCard } from "../../shared/TitleSvgCard";
import { AddModelContext } from "../_context/AddModelContext";

import { Button } from "@/components/_shared/buttons/Button";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { useMediaQuery } from "@uidotdev/usehooks";
import { DashBoardContext } from "../../_context/DashBoardContext";
import gsap from "gsap";

import Close from '@/icons/dashboard/x.svg'
import { Video } from "@/components/_shared/video/Video";
import { getDuration } from "@/utils/Video";

type FileInputProps = {};

export const FileInput = ({}: FileInputProps) => {
  const user = useUser();
  const isMobile = useMediaQuery('(max-width: 768px)')
  const context = useContext(AddModelContext);
  const dashboardContext = useContext(DashBoardContext);

  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const [progressUpload, setProgressUpload] = useState<number | undefined>(undefined);

  const formatError =  <span> Format de fichier incorrect. <Link href="/">En savoir plus</Link></span> ;
  const unknowError = <span>Quelque chose s&#39;est mal passé, veuillez réessayer</span>;

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<JSX.Element>(formatError);

  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState('0');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setErrorMsg(<></>);
    const formData = new FormData();
    const elementData: any = {};

    elementData["publishedAt"] = null;
    elementData["user_info"] = user[0].details.id;

    let _error = false;
    Array.from(form.current!.elements).map((input: any) => {
      if (!["file"].includes(input.type)) elementData[input.name] = input.value;
      else if (input.type === "file")
        for (let i = 0; i < input.files.length; i++) {
          const fileSize = (input.files[i].size / 1024 / 1024).toFixed(2);

          if (
            parseInt(fileSize) >
            parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE as string)
          ) {
            setError(true);
            _error = true;
            setErrorMsg(
              <span>
                Le fichier {input.files[i].name} est très volumineux, il ne doit
                pas dépasser les{" "}
                {process.env.NEXT_PUBLIC_MAX_FILE_SIZE as string} mb.
              </span>
            );
            return;
          }

          formData.append(
            `files.${input.name}`,
            input.files[i],
            input.files[i].name
          );
        }
    });

    if (!_error) {
      formData.append("data", JSON.stringify(elementData));

      setLoading(true);
      const resEditorVideo = await useStrapiPost(
        "editor-videos",
        formData,
        false /*true*/,
        true,
        (progressEvent) => { setProgressUpload(progressEvent.progress); }
      );

      if (resEditorVideo.status === 200) {  
        setLoading(false);

        !isMobile && context.setCurrentStep(1);
        isMobile && setVideoUploaded(true)    

        context.setCurrentEditorVideo(resEditorVideo.data.data.id);

      } else {        
        setError(true);
        setErrorMsg(unknowError);
      }
    }
  };

  const handleDragOver = () => {
    setIsDragging(true);
  };

  const handleDrop = () => {
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (!["video/mp4"].includes(e.target.files![0].type)) {
        setError(true);
        setErrorMsg(formatError);
      } else {
        setSelectedFile(e.target.files![0]);
        context.setCurrentEditorVideo(null)
        form.current?.requestSubmit();
      }
    }
  };
  
  const { data: data, mutate: getStrapi } = useStrapi(
    "dashboard-monteur?" +
    "populate=*",
    false
  );

  useEffect(() => {
    getStrapi();
  }, []);

  useEffect(() => {    
    const mobileButtons = 
      <>
        <Button
          type="primary"
          label="Modifier"
          className={`w-full z-10`}
          disabled={!(videoUploaded && !loading)}
          onClick={() => {
            context.abort();
            input.current?.click();
          }}
        />

        { videoUploaded 
        ?
          <Button
            type="secondary"
            label="Continuer"
            className={`w-full z-10`}
            disabled={loading}
            onClick={() => {
              context.setCurrentStep(1)
            }}
          />
        :
          <Button
          type="secondary"
          label="Sélectionner un fichiers"
          className={`w-full z-10`}
          disabled={loading}
          onClick={() => {
            input.current?.click();
          }}
      />
        }
      </>
    
    isMobile && dashboardContext.setButtons(mobileButtons) 

    return () => {
      dashboardContext.setButtons(undefined) 
    }
  }, [videoUploaded, loading])

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="py-[100px] md:py-0 flex flex-col gap-dashboard-spacing-element-medium h-full md:h-auto">
      <div className="file-input flex flex-col h-full md:h-auto gap-dashboard-spacing-element-medium items-end justify-between">
        {isMobile && <IslandButton 
          type="secondary"
          Icon={Close}
          iconColor="appleRed"
          onClick={() => {
            dashboardContext.setIsAddModelPannelOpen(false)
            context.setCurrentStep(undefined)
            context.abort()
          }}
          className="w-max self-end mr-dashboard-button-separation-spacing"
        />}

        <div
          className={`w-full relative bg-black rounded-3xl flex h-full justify-center items-center border border-white border-opacity-0 ${isDragging && "border-opacity-30"}`}
          onDragOver={() => {
            handleDragOver();
          }}
          onDragEnter={() => {
            handleDragOver();
          }}
          onDrop={() => {
            handleDrop();
          }}
          onDragLeave={() => {
            handleDrop();
          }}
        >
          <div className={`flex flex-col gap-8 px-14 py-16 items-center ${context.strapiObject ? 'hidden' : 'block'} `}>
            <Upload />
            <div className="text-center flex flex-col items-center gap-4">
              <div className="text-medium w-[340px]">
                {isMobile ? 'Ajoutez une vidéo' : 'Glissez-déposez le fichier que vous souhaitez mettre en ligne'}
              </div>
              <div className="text-dashboard-text-description-base text-base-light w-8/12">
                Vos vidéos resteront privées jusqu’à leur publication. Chaque
                modèle est vérifié avant d’être publié dans le catalogue.
              </div>

              {error && (
                <div className="flex flex-row gap-2 items-center">
                  <Warning />
                  {errorMsg}
                </div>
              )}
            </div>

            <div className="fixed md:relative bottom-0 flex flex-col items-stretch md:flex-row gap-dashboard-mention-padding-right-left z-popup">{
              !isMobile && 
              <>
                <IslandButton
                  type="small"
                  label="Modifier"
                  className={`w-max z-10`}
                  disabled={!loading}
                  onClick={() => {
                    // context.handleModifyInputVideo()
                  }}
                />

                <IslandButton
                  type="small"
                  label="Sélectionner un fichiers"
                  className={`w-max z-10`}
                  disabled={loading}
                  onClick={() => {
                    input.current?.click();
                  }}
                />
              </>
            }</div>

            {loading && 
              <div className="absolute bottom-0 w-full pb-[28px] pt-[13px] px-[24px]">
                <Loader progress={progressUpload} />
              </div>
            }
          </div>

          {
          context.strapiObject &&
            <div className="w-full self-center justify-self-center relative px-dashboard-mention-padding-right-left z-10">
              <Video
                ref={videoRef}
                video={context.strapiObject.attributes.video.data.attributes}
                onLoadedMetadata={() => {                   
                  videoRef.current && setVideoDuration(getDuration(videoRef.current).mmss) 
                }}
              />
              <div className="p-dashboard-button-separation-spacing flex flex-col gap-dashboard-button-separation-spacing">
                <div className="text-base text-dashboard-text-title-white-high">{context.strapiObject.attributes.video.data.attributes.name}</div>
                <div className="text-dashboard-text-description-base">{videoDuration}</div>
              </div>
            </div>  
          }

          <form
            ref={form}
            className="absolute top-0 left-0 w-full h-full z-0"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="video" className="opacity-0">
              {" "}
              Sélectionnez une video{" "}
            </label>
            <input
              ref={input}
              type="file"
              name="video"
              id="video"
              className="opacity-0 w-full h-full"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(e) => handleChange(e)}
            />
          </form>
        </div>

      </div>
      {(user[0].models?.length < 3 || !user[0].models) && (
        <TitleSvgCard
          className="mt-5"
          img="/img/dashboard/cristal-ball.png"
          title={ data?.attributes.add_model.title ? data?.attributes.add_model.title : "Augmentez votre visibilité" }
          text={ data?.attributes.add_model.content ? data?.attributes.add_model.content : "En ajoutant des modèles vous augmentez vos chances d’être vu par les créateurs à la recherche d’un monteur pour leur prochain projet. Nous vous conseillons d’ajouter 3 modèles pour apparaître le plus largement possible." }
        />
      )}
    </div>
  );
};

type LoaderProps = {
  progress: number | undefined
}

const Loader = ({progress}:LoaderProps) => {
  const container = useRef<HTMLDivElement>(null)
  const progressTrack = useRef<HTMLDivElement>(null)
  const trackButton = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(container.current) {
      gsap.set(progressTrack.current, {
        x: progress ? -container.current.offsetWidth + container.current.offsetWidth * progress : -container.current.offsetWidth
      })
      gsap.set(trackButton.current, {
        x: progress ? container.current.offsetWidth * progress : -container.current.offsetWidth
      })
    }
  }, [progress])

  return (
    <div 
      ref={container}
      className="loader relative h-[4px] w-full"
    >
      <div ref={trackButton} className="loader__progress-dot absolute h-full z-10">
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full bg-dashboard-text-title-white-high">
          {progress && <div className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2">{Math.ceil(progress * 100)}%</div>}
        </div>
      </div>

      <div className="overflow-hidden relative w-full h-full rounded-full">
        <div className="track absolute top-0 left-0 w-full h-full bg-neutral-02"></div>
        <div 
          ref={progressTrack}
          className="progressTrack absolute top-0 left-0 w-full h-full bg-blueBerry"></div>
      </div>

    </div>
  )
}
