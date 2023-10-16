import { Tag } from "@/components/_shared/UI/Tag"
import Button from "@/components/_shared/form/Button"
import Input from "@/components/_shared/form/Input"
import { InputVignet } from "@/components/_shared/form/InputVignet"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { AvatarInput } from "@/components/_shared/form/AvatarInput"
import { Dropdown } from "@/components/_shared/form/Dropdown"
import { EditorProfilContext, EditorProfilContextProvider } from "./_context/EditorProfilContext"
import useMediaQuery from "@/hooks/useMediaQuery"
import { Card } from "@/components/_shared/UI/Card"
import Image from "next/image"
import gsap from "gsap"

import MailIcon from '@/icons/mail.svg'
import Key from '@/icons/key.svg'
import Infos from '@/icons/info.svg'
import Play from '@/icons/play-stroke.svg'
import Smartphone from '@/icons/smartphone.svg'
import Mappin from '@/icons/map-pin.svg'
import Star from '@/icons/star.svg'
import Setting from '@/icons/settings.svg'
import Chevron from '@/icons/chevron.svg'

import { UserNameInput, FNameInput, LNameInput, DescInput, PhoneInput, EmailInput, StreetInput, ZipCodeInput, CityInput, AddressMore } from "./profil/inputs"

export const DashboardEditorProfil = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div className="db-profil flex flex-col gap-4 md:gap-12">
      <EditorProfilContextProvider>
        {isDesktop ? 
          <ProfilDesktop /> :
          <ProfilMobile />
        }
      </EditorProfilContextProvider>
    </div>
  )
}

const ProfilDesktop = () => {
  const context = useContext(EditorProfilContext)
  
  return (
    <>
      <div className="db-profil__head">
        <div className="db-profil__infos flex flex-col sm:flex-row justify-center sm:justify-start text-center sm:text-left items-center gap-12">
          <AvatarInput 
            img={context.avatar}
            onChange={(e:ChangeEvent) => { context.handleAvatarChange(e) }}
          />
          <div className="db-profil__infos-text flex flex-col gap-2">
            <div className="n27 font-medium text-lg uppercase">{context.fName} {context.lName}</div>
            <div className="text-base-text flex flex-col sm:flex-row items-center gap-2">
              <span className="uppercase">{context.username}</span> <div className="w-[5px] h-[5px] rounded-full bg-base-text hidden sm:block"></div> Inscrit depuis Septembre 2023
            </div>
            <div className="text-base-text">{context.email}</div>
          </div>
        </div>
        <div className="db-profil__buttons flex justify-center sm:justify-start gap-4 sm:gap-12 mt-12 flex-wrap">
          <Button 
            className="w-max"
            variant="primary"
            text="Modifier mon mot de passe"
            onClick={() => { context.handleModifyPassword()}}
          />
          <Button 
            className="w-max"
            variant="black"
            text="Modifier mon adresse mail"
            onClick={() => { context.handleModifyEmail()}}
          />
        </div>
      </div>

      <hr />

      <div className="db-profil__description">
        <DescInput />
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-8 sm:basis-1/2">
          <UserNameInput />

          <FNameInput />

          <LNameInput />

        </div>
        <div className="flex flex-col gap-3 sm:basis-1/2">
          <InputVignet 
            label="Modèle en avant"
            buttonLabel="Modifier le modèle"
            desc="Importez une image qui donne un aperçu du contenu de votre vidéo. Une bonne image se remarque et attire l'attention des spectateurs."
            image="/img/img3.png"
            onChange={() => { context.handleModelChange('model')}}
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="sm:basis-1/2">
          <EmailInput />
        </div>

        <div className="sm:basis-1/2">
          <PhoneInput />
        </div>
      </div>

      <hr />

      <div className="n27 font-medium text-[28px]">Adresse</div>

      <div className="grid lg:grid-rows-2 lg:grid-cols-2 gap-8">
          <StreetInput />

          <ZipCodeInput />

          <CityInput />
          
          <AddressMore />
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="n27 font-medium text-[28px]">Langue parlée</div>
        <Dropdown 
          label={'Rechercher une langue'}
          onChange={(e) => { context.handleAddLang(e)}}
          className='relative z-20'
          options={context.langOptions}
          selected={context.spokenLanguages}
        />
      </div>

      <div className="flex gap-2">
        {context.spokenLanguages && context.spokenLanguages.map((lang, i) => {
          return (
            <Tag 
              bg="light"
              key={i}
              text={lang.label}
              onClose={() => { 
                context.handleRemoveLang(lang)}}
              icon='cross'
            />
          )
        })}
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="n27 font-medium text-[28px]">Compétences</div>
        <Dropdown 
          label={'Ajouter une compétence'}
          onChange={(e) => { context.handleAddSkill(e)}}
          className='relative z-10'
          options={context.skillsOptions}
          selected={context.skills}
        />
      </div>


      <div className="flex gap-2">
        {context.skills && context.skills.map((skill, i) => {
          return (
            <Tag 
              bg="light"
              key={i}
              text={skill.label}
              onClick={() => { context.handleRemoveSkill(skill)}}
              icon='cross'
            />
          )
        })}
      </div>    
    </>
  )
}

const ProfilMobile = () => {
  const context = useContext(EditorProfilContext)
  const [showPan, setShowPan] = useState(false)

  const [showProfilPan, setShowProfilPan] = useState(false)
  const [showEmailPan, setShowEmailPan] = useState(false)
  const [showPassWordPan, setShowPassWordPan] = useState(false)
  const [showPersoInfoPan, setShowPersoInfoPan] = useState(false)
  const [showModelPan, setShowModelPan] = useState(false)
  const [showContactPan, setShowContactPan] = useState(false)
  const [showAddressPan, setShowAddressPan] = useState(false)
  const [showLangPan, setShowLangPan] = useState(false)
  const [showSkillsPan, setShowSkillsPan] = useState(false)

  const panW = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if(showPan === false) {
            setShowProfilPan(false)
            setShowEmailPan(false)
            setShowPassWordPan(false)
            setShowPersoInfoPan(false)
            setShowModelPan(false)
            setShowContactPan(false)
            setShowAddressPan(false)
            setShowLangPan(false)
            setShowSkillsPan(false)
          }
        }
      })

      tl.fromTo(panW!.current, {
        xPercent: showPan ? 100 : 0 
      },{
        xPercent: showPan ? 0 : 100,
        ease: showPan ? 'power3.out' : 'power3.in'
      })
    })

    const closeOnEscape = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        showPan && setShowPan(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      ctx.revert()
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [showPan])

  return (
    <div className="relative flex flex-col gap-4">
      <div className="db-profil__head flex gap-4 overflow-x-scroll no-scroll-bar">
        <Card 
          borderRadius={40}
          bg="background-card"
          className="shrink-0 min-w-[300px]"
        >
          <div className="db-profil__infos flex flex-col justify-start items-center py-9 px-4 gap-5">
            <div className="n27 uppercase text-lg">{context.fName} {context.lName}</div>
            <AvatarInput 
              img={context.avatar}
              onChange={(payload:ChangeEvent<HTMLInputElement>) => { context.handleAvatarChange(payload) }}
            />
            <Button 
              text="Modifier le profil"
              variant="black"
              className="w-max"
              onClick={() => {
                setShowPan(true)
                setShowProfilPan(true)
              }}
            />
          </div>
        </Card>

        <Card
          borderRadius={40}
          bg="background-card"
          className="shrink-0"
        >
          <div className="flex flex-col justify-start items-center py-9 px-4  gap-5">
            <div className="n27 uppercase text-lg">Modele Name</div>
              <Card
                bg="background-card"
                borderRadius={18}
              >
                <div className="relative h-28 w-60">
                  <Image
                      src="/img/img.png"
                      alt="alternativeText" 
                      fill
                      className="object-cover rounded-2xl"
                    />
                </div>
              </Card>
            <Button 
              text="Modifier le modèle"
              variant="black"
              className="w-max"
            />
          </div>
        </Card>
      </div>

      <Card
        borderRadius={40}
        bg="background-card"
      >
        <div className="bg-profil__menu-w divide-y px-4 py-12">
          <ProfilMenuItem 
            label="Modifier mon adresse mail"
            onClick={() => {              
              context.handleModifyEmail()
            }}
            Icon={MailIcon}
          />
          <ProfilMenuItem 
            label="Modifier mon mot de passe"
            onClick={() => {
              context.handleModifyPassword()
            }}
            Icon={Key}
          />
          <ProfilMenuItem 
            label="Informations personnelles"
            onClick={() => {
              setShowPan(true);
              setShowPersoInfoPan(true);
            }}
            Icon={Infos}
          />
          <ProfilMenuItem 
            label="Modèle en avant"
            onClick={() => {
              setShowPan(true);
              setShowModelPan(true);
            }}
            Icon={Play}
          />
          <ProfilMenuItem 
            label="Contact"
            onClick={() => {
              setShowPan(true);
              setShowContactPan(true);
            }}
            Icon={Smartphone}
          />
          <ProfilMenuItem 
            label="Adresse"
            onClick={() => {
              setShowPan(true);
              setShowAddressPan(true);
            }}
            Icon={Mappin}
          />
          <ProfilMenuItem 
            label="Langues parlées"
            onClick={() => {
              setShowPan(true);
              setShowLangPan(true);
            }}
            Icon={Star}
          />
          <ProfilMenuItem 
            label="Compétences"
            onClick={() => {
              setShowPan(true);
              setShowSkillsPan(true);
            }}
            Icon={Setting}
          />
        </div>
      </Card>

      <Card
        ref={panW}
        className={`db-profil__panW fixed top-0 w-full z-popup h-screen`}
        bg="background-card"
        borderRadius={40}
      >
        <div 
          data-lenis-prevent className="flex flex-col h-full top-10 overflow-scroll no-scroll-bar px-4 py-9"
        >

          {showProfilPan && <EditProfilPan />}
          {showModelPan && <ModelPan />}
          {/* {showEmailPan && <EmailPan />} */}
          {/* {showPassWordPan && <PassWordPan />} */}
          {showPersoInfoPan && <PersoInfoPan />}
          {showContactPan && <ContactPan />}
          {showAddressPan && <AddressPan />}
          {showLangPan && <LangPan />}
          {showSkillsPan && <SkillsPan />}
          
          <div className="mt-auto mb-0">
            <Button 
              variant="primary"
              text="Enregistrer le profil"
              onClick={() => { context.handleUpdateProfil()}}
              className="mt-12"
            />

            <Button 
              variant="black"
              text="Annuler"
              onClick={() => { 
                setShowPan(false)
                context.handleResetContext()
              }}
              className="mt-4"
            />
          </div>

        </div>
      </Card>
    </div>
  )
}

type profilMenuItemProps = {
  label: string,
  Icon: any,
  className?: string,
  onClick: Function,
}

const ProfilMenuItem = ({label, Icon, className, onClick}: profilMenuItemProps) => {
  return (
    <div 
      className={`flex items-center p-4 gap-4 ${className}`}
      onClick={() => { onClick() }}
    >
      <div><Icon /></div>
      {label}
      <div className="ml-auto mr-0"><Chevron /></div>
    </div>
  )
}

const EditProfilPan = () => {
  const context = useContext(EditorProfilContext)

  return (
    <div className="db-profil__profil-pan flex flex-col gap-12">
      <AvatarInput
        img={context.avatar}
        onChange={(payload:ChangeEvent<HTMLInputElement>) => { context.handleAvatarChange(payload) }}
        className="mx-auto"
        showOverlay
      />
      <hr />
      <DescInput />

      <div className="flex flex-col gap-8">
        <UserNameInput />
        <FNameInput />
        <LNameInput />
      </div>

    </div>
  )
}

const ModelPan = () => {
  return (
    <div className="db-profil__model-pan flex flex-col gap-8">

    </div>
  )
}

const EmailPan = () => {
  return (
    <div className="db-profil__email-pan flex flex-col gap-8">
      <EmailInput />
    </div>
  )
}

const PassWordPan = () => {
  return (
    <div className="db-profil__password-pan flex flex-col gap-8">
      
    </div>
  )
}

const PersoInfoPan = () => {
  return (
    <div className="db-profil__perso-info-pan flex flex-col gap-8">
      
    </div>
  )
}

const ContactPan = () => {
  return (
    <div className="db-profil__contact-pan flex flex-col gap-8">

    </div>
  )
}

const AddressPan = () => {
  return (
    <div className="db-profil__address-pan flex flex-col gap-8">
      <StreetInput />

      <ZipCodeInput />

      <CityInput />

      <AddressMore />    
    </div>
  )
}

const LangPan = () => {
  return (
    <div className="db-profil__lang-pan">
      
    </div>
  )
}

const SkillsPan = () => {
  return (
    <div className="db-profil__skills-pan">
      
    </div>
  )
}