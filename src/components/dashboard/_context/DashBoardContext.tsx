import useStrapi from "@/hooks/useStrapi"
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

  sendSponsorLink: (email: string) => {}
})

export const DashBoardContextProvider = ({children}:PropsWithChildren) => {
  const dispatch = useDispatch()
  
  const { data: data, mutate: getStrapi } = useStrapi(
    "dashboard-monteur?" +
    "populate[add_model]=*&" +
    "populate[news_info][populate][news_info_post][populate]=*&" +
    "populate[news_info][populate][info_card][populate]=*",
    false
  );

  const [panels, setPanels] = useState<dashBoardPanelType[] | undefined>(undefined)
  const [activePanel, setActivePanel] = useState(0)

  const [isAddModelPannelOpen, setIsAddModelPannelOpen] = useState(false)

  const [notificationCenterAnimated, setNotificationCenterAnimated] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)

  const [buttons, setButtons] = useState<any | undefined>(undefined)
  
  useEffect(() => {
    dispatch(getNotifications())
    getStrapi();
  }, [])

  let posts:dashboardPostType[] = [];

  if (data && data.attributes && data.attributes.news_info) {
    if (data.attributes.news_info.news_info_post) {
      const news_info_post = data.attributes.news_info.news_info_post
    
      posts = news_info_post.map((post:any) => {
        return {
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          author: post.author,
          date: new Date(post.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          length: post.length,
          link: post.link
        }
      })
    }
  }

  const infoCardActive = data?.attributes.news_info.info_card.isActive ? true : false
  const infoCard:infoCardType = {
    title: `${ data?.attributes ? data.attributes.news_info.info_card.title : 'Error' }`,
    text: <div><p>{ data?.attributes ? data.attributes.news_info.info_card.content : '' }</p></div>,
    img: `${ data?.attributes ? data.attributes.news_info.info_card.picture.data.attributes.url : '/img/img.png' }`,
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

  const sendSponsorLink = (email: string) => {
    // TODO: Integration do the logic of the sponsor friend feature
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

        sendSponsorLink
      }}
    >
      {children}
    </DashBoardContext.Provider>
  )  
}