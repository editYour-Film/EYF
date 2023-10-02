import Button from "@/components/_shared/form/Button"
import MessageCircle from "@/icons/dashboard/message-circle.svg"
import { useContext } from "react"
import { AddModelContext } from "../DashboardEditorHome"
import { TitleSvgCard } from "../../shared/TitleSvgCard"

export const EndPan = () => {
  const context = useContext(AddModelContext)

  const title = context.isModify ? "Vos modifications ont bien été prise en compte" : "Votre modèle est en cours de vérification par nos équipes !"
  const content = context.isModify ? "Cliquez sur le bouton pour revenir à votre dashboard" : "Vos vidéos resteront privées jusqu’à leur publication.  Chaque modèle est vérifié avant d’être publié dans le catalogue."

  return (
    <>
      <div className="relative bg-black rounded-2xl px-16 py-14 overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-8">
          <MessageCircle />
          <div className="flex flex-col items-center w-2/3 gap-4 text-center">
            <div className="n27 text-2xl">{title}</div>
            <div className="text-sm text-base-text">{content}</div>
          </div>
          <Button 
            text="Retour à l'accueil"
            variant="primary"
            className="w-max"
            onClick={() => { 
              context.initData()
              context.hideAddModel()
            }}
          />
        </div>
        <div className="absolute bg-signin top-0 left-1/2 -translate-x-1/2 translate-y-[10%] w-[80%] h-[300%] pointer-events-none"></div>
      </div>
      <TitleSvgCard 
        className="mt-5"
        img="/img/dashboard/headphones-drink.svg"
        title='Catalogue hors ligne'
        text='Profitez de la version BETA de editYour.film afin d’enrichir votre galerie de modèles et compléter votre profil avant la sortie public du catalogue. Très bientôt des informations vous seront communiquées afin de vous préparer à vos premières missions.'
      />
    </>

  )
}