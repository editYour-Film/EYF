import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import Input from "@/components/_shared/form/Input"
import { useResizeTextArea } from "@/hooks/useResizeTextArea"
import { useUpdateEffect } from "@/hooks/useUpdateEffect"
import { useLenis } from "@studio-freight/react-lenis"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form"
import { mergeRefs } from "react-merge-refs"

type InfoTabProps = {
  onConfirm: () => void;
  onErrors: () => void;
}

export const InfoTab = ({onConfirm, onErrors}: InfoTabProps) => {
  return (
    <div className="info-tab flex flex-col gap-dashboard-spacing-element-medium">
      <div className="text-dashboard-text-title-white-high text-title-medium">Vue d'ensemble du projet</div>

      <TitleDesc
        title="Partagez vos directives au monteur"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ac tortor id vulputate. Integer laoreet leo quis ex volutpat, eget feugiat justo lacinia. Nam suscipit, elit eu iaculis feugiat, augue ex vestibulum libero, quis vulputate eros dui nec risus. Sed facilisis,"
      />

      <Form 
        onFormValid={() => {
          onConfirm()
        }}
        onFormInvalid={() => {
          onErrors()
        }}
      />

    </div>
  )
}

const TitleDesc = ({title, desc}:{title:string, desc:string}) => {
  return (
    <div>
      <div className="text-title-small text-dashboard-text-description-base">{title}</div>
      <div className="text-base text-dashboard-text-description-base-low">{desc}</div>
    </div>
  ) 
}

type FormFields = {
  title: string,
  desc: string,
  script: string,
  visuals: string,
  sounds: string,
  notes: string,
  resolution: '1280x720' | '1920x1080' | '2048x1080' | '3840x2160',
  format: 'mp4' | 'avi' | 'mov' | 'HEVC' | 'mkv' | 'prores',
}

type FormProps = {
  onFormValid: () => void,
  onFormInvalid: () => void,
}

const Form = ({onFormValid, onFormInvalid}: FormProps) => {
  const resolutionOptions = [
    {
      label: "1280x720 pixels (720p)",
      value: "1280x720",
      helper: "C'est une résolution HD standard utilisée pour la diffusion en ligne, sur les réseaux sociaux et sur la plupart des télévisions HD."
    },
    {
      label: "1920x1080 pixels (1080p)",
      value: "1920x1080",
      helper: "Également une résolution HD, il s'agit de la norme pour la diffusion sur les télévisions Full HD et sur de nombreuses plates-formes en ligne."
    },
    {
      label: "2048x1080 pixels ",
      value: "2048x1080",
      helper: "La résolution 2K est principalement utilisée dans le cinéma numérique et offre une meilleure qualité d'image que la Full HD. Elle est également connue sous le nom de DCI 2K (Digital Cinema Initiatives)."
    },
    {
      label: "3840x2160 pixels UHD (Ultra Haute Définition)",
      value: "3840x2160",
      helper: "Le 4K est de plus en plus courant, offrant une résolution quatre fois supérieure à la Full HD. Il est utilisé pour les productions haut de gamme, la diffusion en ligne, la création de contenu UHD et la distribution sur les télévisions 4K."
    }
  ]
  const formatOptions = [
    {
      label: "MP4 (MPEG-4 Part 14)",
      value: "mp4"
    },
    {
      label: "AVI (Audio Video Interleave)",
      value: "avi"
    },
    {
      label: "MOV (QuickTime Movie)",
      value: "mov"
    },
    {
      label: "H.264, H.265 (HEVC)",
      value: "HEVC"
    },
    {
      label: "MKV (Matroska Video)",
      value: "mkv"
    },
    {
      label: "ProRes",
      value: "prores"
    },   
  ]

  const { register, handleSubmit, formState:{errors}, watch } = useForm<FormFields>();

  const onSubmit:SubmitHandler<FormFields> = (data, e) => {    
    onFormValid()    
  }

  const watchAll = watch()

  const [format, setFormat] = useState(formatOptions[0].value)
  const [resolution, setResolution] = useState(resolutionOptions[0].value)

  useEffect(() => {
    errors && onFormInvalid()
  }, [watchAll])
  
  return (
    <form className="flex flex-col gap-dashboard-spacing-element-medium" onSubmit={handleSubmit(onSubmit)}>
      <div className="divide-y border rounded-dashboard-button-square-radius">
        <TextInput 
          register={register("title", {
            required: 'Veuillez entrer un titre'
          })}
          label="Titre"
          id="project-title"
          placeholder="Choisir un nom pour votre projet..."
          required
          error={errors.title && errors.title.message}
        />
        <TextInput 
          register={register("desc", {
            required: 'Veuillez entrer une description'
          })}
          label="Vue d’ensemble du projet"
          id="project-description"
          placeholder="Détaillez le concept du projet et ses objectifs. Précisez le ton, l’ambiance, le style visuel..."
          required
          error={errors.desc && errors.desc.message}
        />
        <TextInput 
          register={ register("script")}
          label="Script et narration"
          id="project-script"
          placeholder="Partagez le script pour aider le monteur à comprendre le flux narratif des séquences..."
        />
        <TextInput 
          register={ register("visuals")}
          label="Consistence visuelle"
          id="project-visuals"
          placeholder="Précisez les normes de couleurs et d’étalonnage à respecter..."
        />
        <TextInput 
          register={ register("sounds")}
          label="Son et musique"
          id="project-sound"
          placeholder="Indiquez si des ajustements de son ou de musique sont nécessaires..."
        />
        <TextInput 
          register={ register("notes")}
          label="Notes sur le montage"
          id="project-notes"
          placeholder="Partagez vos idées sur la structure du montage..."
        />
      </div>

      <hr />

      <TitleDesc
        title="Résolution"
        desc="Précisez la résolution et le format requis pour le projet final."
      />

      <Input 
        {... register("resolution")}
        type="radioColumn"
        options={resolutionOptions}
        selectedOption={resolution}
        value={resolution}
        helpIconText="Help"
        onChange={(e) => {
          setResolution(e)
        }}
      />

      <hr />

      <Input 
        {... register("format")}
        type="radio"
        options={formatOptions}
        selectedOption={format}
        value={format}
        className="text-dashboard-text-description-base"
        onChange={(e) => {
          setFormat(e)
        }}
      />

      <hr />

      <TitleDesc
        title="Orgnisation des rushs"
        desc="Choisissez de rendre votre vidéo publique, non répertoriée ou privée."
      />

      <IslandButton
        submit
        type="primary"
        label="Confirmer et accéder au paiement"
        className="w-max self-end"
      />
    </form>
  )
}

interface TextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string,
  id: string,
  onValueChange?: (value: string) => void,
  register: any,
  error?: string | false,
}

const TextInput = ({label, id, onValueChange, error, register, ...rest}:TextInputProps) => {
  const { required } = rest
  const [value, setValue] = useState("")

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { onChange, onBlur, name, ref } = register

  useResizeTextArea(inputRef, value)

  return (
    <div className="flex flex-col p-dashboard-button-separation-spacing gap-[10px]">
      <label 
        htmlFor={id}
        className="text-small-light text-dashboard-text-description-base-low"
      >
        {label} {required ? '*' : ''}
      </label>
      <textarea 
        ref={mergeRefs([ref, inputRef])}
        id={id}
        name={name}
        className="bg-transparent text-dashboard-text-description-base text-base h-max min-h-[auto] resize-none"
        value={value}
        rows={1}
        onChange={(e) => {
          onChange(e)
          setValue(e.target.value)
          onValueChange && onValueChange(e.target.value)
        }}
      ></textarea>
      {error && <div className="input-error text-small text-dashboard-warning">{error}</div>}
    </div>
  )
}