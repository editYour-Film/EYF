import routes from "@/routes";
import house from "@/icons/house.svg";
import schedule from "@/icons/schedule.svg";
import camera from "@/icons/camera.svg";
import person from "@/icons/person.svg";

import clock from "@/icons/Clock.svg";
import mouse from "@/icons/mouse.svg";
import folder from "@/icons/folder.svg";
import settings from '@/icons/settings.svg'

import news from '@/icons/news.svg'
import play from '@/icons/play-stroke.svg'
import book from '@/icons/book.svg'

export const LANDING_MENU = [
  {
    icon: house,
    label: "Accueil",
    link: routes.HOME,
  },
  {
    icon: book,
    label: "catalogue",
    link: routes.CATALOGUE,
  },
  {
    icon: play,
    label: "Notre histoire",
    link: routes.WHOWEARE,
  },
  {
    icon: news,
    label: "Blog",
    link: routes.BLOG,
  },
  {
    icon: person,
    label: "connexion",
    link: routes.SIGNIN,
  },
]

export const DASHBOARD_EDITOR_MENU = [
  {
    icon: house,
    label: "Bienvenue",
    link: routes.DASHBOARD_EDITOR_HOME,
  },
  {
    icon: schedule,
    label: "Agenda",
    link: routes.DASHBOARD_EDITOR_SCHEDULE,
  },
  {
    icon: clock,
    label: "Commandes",
    link: routes.DASHBOARD_EDITOR_ORDERS,
    disabled: true,
  },
  {
    icon: mouse,
    label: "Studio",
    link: routes.DASHBOARD_EDITOR_STUDIO,
    disabled: true,
  },
  {
    icon: folder,
    label: "Documents",
    link: routes.DASHBOARD_EDITOR_DOCUMENTS,
    disabled: true,
  },
  {
    icon: person,
    label: "Profil",
    link: routes.DASHBOARD_EDITOR_PROFIL,
  },
  {
    icon: settings,
    label: "Paramètres",
    link: routes.DASHBOARD_EDITOR_SETTINGS,
    disabled: true,
  },
]

export const DASHBOARD_CLIENT_MENU = [
  {
    icon: house,
    label: "Accueil",
    link: routes.DASHBOARD_CLIENT_HOME,
  },
  {
    icon: clock,
    label: "Commandes",
    link: routes.DASHBOARD_CLIENT_ORDERS,
  },
  {
    icon: mouse,
    label: "studio",
    link: routes.DASHBOARD_CLIENT_STUDIO,
    disabled: true
  },
  {
    icon: folder,
    label: "Documents",
    link: routes.DASHBOARD_CLIENT_FILES,
  },
  {
    icon: person,
    label: "Profil",
    link: routes.DASHBOARD_CLIENT_PROFIL,
  },
  {
    icon: settings,
    label: "Paramètres",
    link: routes.DASHBOARD_CLIENT_SETTINGS,
  },
]