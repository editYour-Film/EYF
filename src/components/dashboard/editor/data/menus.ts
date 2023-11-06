import routes from "@/routes";
import house from "@/icons/house.svg";
import schedule from "@/icons/schedule.svg";
import camera from "@/icons/camera.svg";
import chartArrow from "@/icons/chart-arrow.svg";
import person from "@/icons/person.svg";

import clock from "@/icons/Clock.svg";
import mouse from "@/icons/mouse.svg";
import folder from "@/icons/folder.svg";
import settings from '@/icons/settings.svg'


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
    icon: camera,
    label: "Missions",
    link: routes.DASHBOARD_EDITOR_MISSIONS,
  },
  {
    icon: chartArrow,
    label: "Historique",
    link: routes.DASHBOARD_EDITOR_HISTORY,
  },
  {
    icon: person,
    label: "Profil",
    link: routes.DASHBOARD_EDITOR_PROFIL,
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