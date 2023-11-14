import { useContext, useEffect, useState } from "react"
import { Day } from "./Day"
import { TitleSvgCard } from "../../shared/TitleSvgCard"

import coffeeClock from "@/img/dashboard/coffee-clock.svg"
import { dayNames, monthNames } from "../data/labels"

import Check from '@/icons/dashboard/check-circle-full.svg'
import Clock from '@/icons/Clock.svg'
import Info from '@/icons/info.svg'
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import { AgendaContext } from "../_context/AgendaContext"

type MonthProps = {
  id: number;
  year: number;
};

export const Month = ({id, year}: MonthProps) => {
  const agendaContext = useContext(AgendaContext)

  const [bookedDays] = useState<Date[]>(agendaContext.bookedDays.filter((d) => {
    return (d.getMonth() === id && d.getFullYear() === year)
  }))
  
  const [proposedDays, setProposedDays] = useState<Date[]>(agendaContext.proposedDays.filter((d) => {
    return (d.getMonth() === id && d.getFullYear() === year)
  }))

  const dayOne = new Date(year, id, 1).getDay()
  const lastDate = new Date(year, id + 1, 0).getDate()
  const lastDay = new Date(year, id + 1, 0).getDay()

  const precMonthLastDay = new Date(year, id, 0).getDate()
  
  const [days, setDays] = useState<any[]>([])

  useEffect(() => {
    let newDays = []
    for (let i = dayOne ; i > 1 ; i--) {
      newDays.push({
        type: 'inactive',
        dayNb: precMonthLastDay - i + 1
      })
    }
  
    for (let i = 1 ; i <= lastDate ; i++) {    
      let type = 'remaining'
      const day = new Date(year, id, i)
      if(agendaContext.bookedDays.find((d) => d.getTime() === day.getTime())) type = 'booked'
      else if(agendaContext.proposedDays.find((d) => d.getTime() === day.getTime())) type = 'proposed'
  
      newDays.push({
        dayNb: i,
        date: day,
        type
      })
    }
    
    for (let i = lastDay; i > 0 && i <= 6; i++) {
      newDays.push({
        type: 'inactive',
        dayNb: i - (lastDay) + 1
      })
    }

    setDays(newDays)
    setProposedDays(agendaContext.proposedDays.filter((d) => (d.getMonth() === id && d.getFullYear() === year)))

  }, [agendaContext.proposedDays])

  const handleModify = () => {
    agendaContext.setIsModifying(true)
  }

  const handleSave = () => {
    agendaContext.setIsModifying(false)
    agendaContext.save()
  }

  const handleDateClick = (date: Date, type: 'remaining' | 'proposed') => {    
    agendaContext.handleSwitchDateStatus(date, type)
  }
   
  return (
    <div className="month-pan flex flex-col gap-dashboard-spacing-element-medium">
      <div className="flex flex-col gap-dashboard-mention-padding-right-left">
        <div className="text-title-m text-dashboard-text-description-base n27 uppercase">Période de {monthNames[id]} {year}</div>
        <hr />
        <div className={`flex flex-col lg:flex-row justify-stretch gap-dashboard-mention-padding-right-left`}>
          <div className={`grid grid-month p-dashboard-button-separation-spacing ${agendaContext.isModifying ? 'opacity-100' : 'opacity-70'}`}>
            {dayNames.map((label) => {
              return <div className="w-max place-self-center text-dashboard-text-description-base">{label}</div>
            })}

            {days.map((day, i) => {
              return (
              <Day 
                key={i}
                dayNb={day.dayNb}
                type={day.type}
                precBooked={i !== 0 && i % 7 !== 0 && days[i - 1].type === 'booked'}
                nextBooked={i !== days.length - 1 && i % 7 !== 6 && days[i + 1].type === 'booked'}
                disabled={!agendaContext.isModifying}
                onClick={() => { handleDateClick(day.date, day.type) }}
              />)
            })}
          </div>

          <div className="p-padding-medium w-full fullHd:w-max flex flex-col justify-between gap-padding-medium">
            <div className="flex flex-col gap-dashboard-mention-padding-right-left text-small text-dashboard-text-description-base-low">
              <div className="flex gap-[10px]"><Check className="svg-color-[rgba(82,74,110,1)] w-[24px] h-[24px]"/> {bookedDays.length} jours réservé(s)</div>
              <div className="flex gap-[10px]"><Check className="svg-color-dashboard-success-dark w-[24px] h-[24px]"/> {proposedDays.length} jours affichés disponibles</div>
              <div className="flex gap-[10px]"><Clock className="svg-color-dashboard-button-white-hover w-[24px] h-[24px]"/> {lastDate - (bookedDays.length + proposedDays.length)} jours encore disponible</div>
              <div className="flex gap-[10px]"><Info className="svg-color-dashboard-button-white-hover w-[24px] h-[24px]"/> 2 client(s) ce mois</div>
            </div>
            {
              agendaContext.isModifying === false ?
                <IslandButton 
                  label="Modifier"
                  type="tertiary"
                  onClick={() => { handleModify() }}
                  className="w-max lg:self-end"
                />
              :
                <IslandButton 
                  label="Enregistrer"
                  type="primary"
                  onClick={() => { handleSave() }}
                  className="w-max lg:self-end"
                />
            }
          </div>
        </div>
      </div>
      
      <TitleSvgCard 
        title="Travaillez quand et où vous voulez"
        text="Ajoutez jusqu'à 6 modèles de montage à afficher dans le catalogue. Vos modèles augmentent votre visibilité auprès des créateur.rice.s en quête d'un monteur.se. Le premier modèle que vous ajoutez sera mis en avant sur votre profil public."
        Svg={coffeeClock}
      />
    </div>
  );
};
