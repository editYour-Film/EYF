import { getNotifications } from "@/store/slices/NotificationsSlice"
import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useStrapi } from "@/hooks/useStrapi"

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
  infoCard: undefined as infoCardType | undefined
})

export const DashBoardContextProvider = ({children}:PropsWithChildren) => {
  const [panels, setPanels] = useState<dashBoardPanelType[] | undefined>(undefined)
  const [activePanel, setActivePanel] = useState(0)

  const [isAddModelPannelOpen, setIsAddModelPannelOpen] = useState(false)

  const [notificationCenterAnimated, setNotificationCenterAnimated] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)
  
  const dispatch = useDispatch()

  const { data: data, mutate: getStrapi } = useStrapi(
    "dashboard-monteur?" +
    "populate[add_model]=*&" +
    "populate[news_info][populate]=*",
    false
  );
  
  useEffect(() => {
    dispatch(getNotifications())
    getStrapi();
  }, [])

  let posts:dashboardPostType[];

  if (data && data.attributes && data.attributes.news_info && data.attributes.news_info.news_info_post) {
    const news_info_post = data.attributes.news_info.news_info_post
  
    posts = news_info_post.map((posts) => {
      return {
        title: posts.title,
        excerpt: posts.excerpt,
        category: posts.category,
        author: posts.author,
        date: new Date(posts.date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        length: posts.length,
        link: posts.link
      }
    })
  }

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
        infoCard
      }}
    >
      {children}
    </DashBoardContext.Provider>
  )  
}