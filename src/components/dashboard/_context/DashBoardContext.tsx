import { getNotifications } from "@/store/slices/NotificationsSlice"
import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export interface dashBoardPanelType {
  title: string
  panel: any
}

export interface dashboardPostType {
  title: string,
  excerpt: string,
  category: string,
  author: string,
  date: string,
  length: string,
  link: string
}

export interface infoCardType {
  title: string,
  text: any,
  img: string,
}

export const DashBoardContext = createContext({
  panels: [] as dashBoardPanelType[] | undefined,
  setPanels: (payload: dashBoardPanelType[]) => {},
  addPannel: (payload: dashBoardPanelType) => {},
  closePanels: () => {},
  activePanel: 0,
  setActivePanel: (payload: number) => {},

  isAddModelPannelOpen: false,
  setIsAddModelPannelOpen: (payload: boolean) => {},

  notificationCenterOpen: false,
  notificationCenterAnimated: false,
  setNotificationCenterAnimated: (payload: boolean) => {},
  openNotificationCenter: () => {},
  closeNotificationCenter: () => {},
  toggleNotificationCenter: () => {},

  posts: [] as dashboardPostType[],
  infoCardActive: false,
  infoCard: undefined as infoCardType | undefined,

  buttons: undefined as any,
  setButtons: (payload:any) => {},
})

export const DashBoardContextProvider = ({children}:PropsWithChildren) => {
  const dispatch = useDispatch()

  const [panels, setPanels] = useState<dashBoardPanelType[] | undefined>(undefined)
  const [activePanel, setActivePanel] = useState(0)

  const [isAddModelPannelOpen, setIsAddModelPannelOpen] = useState(false)

  const [notificationCenterAnimated, setNotificationCenterAnimated] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)

  const [buttons, setButtons] = useState<any | undefined>(undefined)
  
  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  // TODO: Integration Get the selection of posts from strapi
  const posts:dashboardPostType[] = [
    {
      title: 'Plateforme de montage vidéo et producteurs s\'unissent',
      excerpt: 'Découvrez le partenariat exceptionnel entre une plateforme de montage vidéo de pointe et des producteurs de renom. Une collaboration qui promet de révolutionner la production vidéo !',
      category: 'Tournage',
      author: 'Julia Dupont',
      date: '21 Novembre, 2022',
      length: '6min',
      link: 'link1'
    }, {
      title: 'EDITYOUR.FILM, POURQUOI FAIRE ?',
      excerpt: 'Parce que votre vidéo va se retrouver au milieu de millions d’autres postées chaque jour sur YouTube, Facebook, Instagram, Tik Tok ou Linkedin réunis !',
      category: 'Montage',
      author: 'Leonie OLMOS',
      date: '21 Novembre, 2022',
      length: '6min',
      link: 'link2'
    }, {
      title: 'Lorem ipsum dolor sit amet consectet Congue tortor ipsum.',
      excerpt: 'Lorem ipsum dolor sit amet consectet Congue tortor ipsum. Lorem ipsum dolor sit amet consectet Congue tortor ipsum.',
      category: 'Partenariat',
      author: 'Francois Herard',
      date: '21 Novembre, 2022',
      length: '6min',
      link: 'link3'
    },
  ]

  // TODO: Integration get if info card is active
  const infoCardActive = true;
  // TODO: Integration get infocard datas
  const infoCard:infoCardType = {
    title: 'Ouverture des agendas',
    text: <div><p>Le 13 décembre, nous ouvrons les agendas pour que vous puissiez ajouter vos disponibilités. Cette mise à jour vous permettra de rendre vos services accessibles aux clients créateurs.</p><p>Dès que vous aurez inscrit vos disponibilités, vos modèles de montage apparaîtront dans notre catalogue. Les clients pourront ainsi vous trouver plus facilement et vous inclure dans leurs devis. Préparez-vous à mettre en avant votre talent !</p></div>,
    img: '/img/img.png',
  }

  const addPannel = (panel:dashBoardPanelType) => {
    if(panels) setPanels([...panels, panel])
    else setPanels([panel])
        
    setActivePanel(panels ? panels?.length : 0)
  }

  const closePanels = () => {
    if(panels) setPanels([panels[0]])
        
    setActivePanel(0)
  }

  const openNotificationCenter = () => {    
    setNotificationCenterOpen(true)
  }

  const closeNotificationCenter = () => {
    setNotificationCenterOpen(false)
  }

  const toggleNotificationCenter = () => {
    setNotificationCenterOpen(!notificationCenterOpen)
  }

  return (
    <DashBoardContext.Provider
      value={{
        panels,
        setPanels,
        addPannel,
        closePanels,
        activePanel,
        setActivePanel,

        isAddModelPannelOpen,
        setIsAddModelPannelOpen,

        notificationCenterOpen,
        notificationCenterAnimated,
        setNotificationCenterAnimated,
        openNotificationCenter,
        closeNotificationCenter,
        toggleNotificationCenter,

        posts,
        infoCardActive,
        infoCard,

        buttons,
        setButtons,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  )  
}