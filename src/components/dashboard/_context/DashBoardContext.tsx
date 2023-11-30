import { AuthContext } from "@/context/authContext"
import useStrapi, { useStrapiGet } from "@/hooks/useStrapi"
import { getNotifications } from "@/store/slices/NotificationsSlice"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export interface dashBoardPanelType {
  title: string
  panel: any
}

export interface CardArticleType {
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

  posts: [] as CardArticleType[],
  infoCardActive: false,
  infoCard: undefined as infoCardType | undefined,

  buttons: undefined as any,
  setButtons: (payload:any) => {},

  initials: undefined as string | undefined
})

export const DashBoardContextProvider = ({children}:PropsWithChildren) => {
  const authContext = useContext(AuthContext)
  const dispatch = useDispatch()
  
  const initials = authContext.user.details.f_name[0] + authContext.user.details.l_name[0]

  const [_data, set_Data] = useState<any>(null)

  const [panels, setPanels] = useState<dashBoardPanelType[] | undefined>(undefined)
  const [activePanel, setActivePanel] = useState(0)

  const [isAddModelPannelOpen, setIsAddModelPannelOpen] = useState(false)

  const [notificationCenterAnimated, setNotificationCenterAnimated] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)

  const [buttons, setButtons] = useState<any | undefined>(undefined)
  
  useEffect(() => {
    dispatch(getNotifications())

    useStrapiGet(
    "dashboard-monteur?" +
    "populate[add_model]=*&" +
    "populate[news_info][populate][articles][populate]=*&" +
    "populate[news_info][populate][info_card][populate]=*").then((res) => {      
      set_Data(res.data.data.attributes)
    })
  }, [])

  const [posts, setPost] = useState<CardArticleType[]>([]);
  const [infoCardActive, setInfoCardActive] = useState(false)
  const [infoCard, setInfoCard] = useState<infoCardType | undefined>(undefined) 
  
  useEffect(() => {    
    if (_data && _data.news_info) {
      if (_data.news_info.articles.data) {
        const articles = _data.news_info.articles.data

        const _posts = articles.map((post:any) => post.attributes)
        
        setPost(_posts)
        setInfoCardActive(_data?.news_info.info_card.isActive ? true : false)
        setInfoCard({
          title: `${ _data ? _data.news_info.info_card.title : 'Error' }`,
          text: <div><p>{ _data ? _data.news_info.info_card.content : '' }</p></div>,
          img: `${ _data ? _data.news_info.info_card.picture.data.attributes.url : '/img/img.png' }`,
        })
      }
    }
  }, [_data])

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

        initials
      }}
    >
      {children}
    </DashBoardContext.Provider>
  )  
}