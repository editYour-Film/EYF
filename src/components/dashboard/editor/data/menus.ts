import routes from "@/routes";
import house from "@/icons/house.svg";
import schedule from "@/icons/schedule.svg";
import camera from "@/icons/camera.svg";
import chartArrow from "@/icons/chart-arrow.svg";
import person from "@/icons/person.svg";

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