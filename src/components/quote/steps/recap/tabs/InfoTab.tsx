import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import Input from "@/components/_shared/form/Input"
import { useResizeTextArea } from "@/hooks/useResizeTextArea"
import { useUpdateEffect } from "@/hooks/useUpdateEffect"
import { useLenis } from "@studio-freight/react-lenis"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

type InfoTabProps = {
  onConfirm: () => void;
  onErrors: () => void;
}

export const InfoTab = ({onConfirm, onErrors}: InfoTabProps) => {
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
      value: "h264_h265"
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

  const lenis = useLenis()

  const [resolution, setResolution] = useState(resolutionOptions[0].value)
  const [format, setFormat] = useState(formatOptions[0].value)
  const [textValues, setTextValues] = useState<{}>({})
  const formRef = useRef<validateHandle>(null)

  const [errors, setErrors] = useState(false)

  const handleValidate = () => {
    if(formRef.current && formRef.current!.validateFields()) {
      onConfirm();
    }
    lenis.scrollTo(0)
  }

  useEffect(() => {
    if(errors) onErrors()
  }, [errors])

  return (
    <div className="info-tab flex flex-col gap-dashboard-spacing-element-medium">
      <div className="text-dashboard-text-title-white-high text-title-medium">Vue d'ensemble du projet</div>

      <TitleDesc
        title="Partagez vos directives au monteur"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ac tortor id vulputate. Integer laoreet leo quis ex volutpat, eget feugiat justo lacinia. Nam suscipit, elit eu iaculis feugiat, augue ex vestibulum libero, quis vulputate eros dui nec risus. Sed facilisis,"
      />

      <Form 
        ref={formRef}
        onChange={(values) => {setTextValues(values)}}
        onError={() => { 
          setErrors(true)
          onErrors() 
        }}
        onSucceed={() => {
          setErrors(false)
        }}
      />

      <hr />

      <TitleDesc
        title="Résolution"
        desc="Précisez la résolution et le format requis pour le projet final."
      />

      <Input 
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
        type="primary"
        label="Confirmer et accéder au paiement"
        onClick={() => {
          handleValidate();
        }}
        className="w-max self-end"
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

type FormProps = {
  onChange: (values: {}) => void,
  onError: () => void,
  onSucceed: () => void
}

type validateHandle = {
  validateFields: () => boolean
}

const Form = forwardRef<validateHandle, FormProps>(({onChange, onError, onSucceed}, ref) => {
  const [title, setTitle] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')

  const [description, setDescription] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>('')

  const [script, setScript] = useState<string>('')
  const [visuals, setVisuals] = useState<string>('')
  const [sound, setSound] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  const values = {
    title,
    description,
    script,
    visuals,
    sound,
    notes
  }

  const checkField = (value:unknown, flags:string[]) => {
    let err = ''

    if(flags.includes('required') && !value) {
      return err = 'value required'
    }

    if(flags.includes('string') && typeof value !== 'string') {
      return err = 'value must be a string'
    }

    return err
  }

  useUpdateEffect(() => {
    onChange(values)
  }, [title, description, script, visuals, sound, notes])

  useEffect(() => {
    if(titleError || descriptionError) {
      onError()
    } else {
      onSucceed()
    }
  }, [titleError, descriptionError])

  const checkAll = () => {
    setTitleError(checkField(title, ['required', 'string']))
    setDescriptionError(checkField(description, ['required', 'string']))
  }

  useImperativeHandle(ref, () => ({
    validateFields: () => {
      checkAll()
      return (checkField(title, ['required', 'string']) || checkField(description, ['required', 'string'])) ? false : true
    }
  }), [titleError, descriptionError])

  return (
    <form>
      <div className="divide-y border rounded-dashboard-button-square-radius">
        <TextInput 
          label="Titre"
          id="project-title"
          name="project-title"
          placeholder="Choisir un nom pour votre projet..."
          required
          onValueChange={(val) => { 
            setTitleError(checkField(val, ['required', 'string']))
            setTitle(val) 
          }}
          error={titleError}
        />
        <TextInput 
          label="Vue d’ensemble du projet"
          id="project-description"
          name="project-description"
          placeholder="Détaillez le concept du projet et ses objectifs. Précisez le ton, l’ambiance, le style visuel..."
          required
          onValueChange={(val) => { 
            setDescriptionError(checkField(val, ['required', 'string']))
            setDescription(val) 
          }}
          error={descriptionError}
        />
        <TextInput 
          label="Script et narration"
          id="project-script"
          name="project-script"
          placeholder="Partagez le script pour aider le monteur à comprendre le flux narratif des séquences..."
          onValueChange={(val) => { setScript(val) }}
        />
        <TextInput 
          label="Consistence visuelle"
          id="project-visuals"
          name="project-visuals"
          placeholder="Précisez les normes de couleurs et d’étalonnage à respecter..."
          onValueChange={(val) => { setVisuals(val) }}
        />
        <TextInput 
          label="Son et musique"
          id="project-sound"
          name="project-sound"
          placeholder="Indiquez si des ajustements de son ou de musique sont nécessaires..."
          onValueChange={(val) => { setSound(val) }}
        />
        <TextInput 
          label="Notes sur le montage"
          id="project-notes"
          name="project-notes"
          placeholder="Partagez vos idées sur la structure du montage..."
          onValueChange={(val) => { setNotes(val) }}
        />
      </div>
    </form>
  )
})

interface TextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string,
  id: string,
  name: string,
  onValueChange: (value: string) => void,
  error?: string,
}

const TextInput = ({label, id, name, onValueChange, error, ...rest}:TextInputProps) => {
  const { required } = rest
  const [value, setValue] = useState("")

  const inputRef = useRef<HTMLTextAreaElement>(null)

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
        ref={inputRef}
        id={id}
        className="bg-transparent text-dashboard-text-description-base text-base h-max min-h-[auto] resize-none"
        value={value}
        rows={1}
        onChange={(e) => {
          setValue(e.target.value)
          onValueChange(e.target.value)
        }}
        {...rest}
      ></textarea>
      {error && <div className="input-error text-small text-dashboard-warning">{error}</div>}
    </div>
  )
}