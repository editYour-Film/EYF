import { useState } from "react"
import { Day } from "./Day"

type MonthProps = {
  id: number,
  year: number,
}

export const Month = ({id, year}: MonthProps) => {
  const dayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

  const dayOne = new Date(year, id, 1).getDay()
  
  const lastDate = new Date(year, id + 1, 0).getDate()
  const lastDay = new Date(year, id + 1, 0).getDay()

  const precMonthLastDay = new Date(year, id, 0).getDate()

  console.log('Mois nb : ' + new Date(year, id).getMonth());
  
  let days:any[] = []

  for (let i = dayOne ; i > 1 ; i--) {
    days.push({
      type: 'inactive',
      dayNb: precMonthLastDay - i + 1
    })
  }

  for (let i = 1 ; i <= lastDate ; i++) {
    const rand = Math.random()
    const type = rand < 0.33 
                  ? 'booked'
                  : rand >= 0.33 && rand < 0.66 
                  ? 'proposed'
                  : 'remaining'
    days.push({
      type: type,
      dayNb: new Date(year, id, i).getDay()
    })
  }
  
  console.log(new Date(year, id + 1, 0).getDay());
  
  for (let i = lastDay; i > 0 && i <= 6; i++) {
    days.push({
      type: 'inactive',
      dayNb: i - (lastDay) + 1
    })
  }
  
  return (
    <div className="grid grid-month w-[400px]">
      {dayLabels.map((label) => {
        return <div className="w-max place-self-center">{label}</div>
      })}

      {days.map((day, i) => {
        return (
        <Day 
          dayNb={day.dayNb}
          type={day.type}
          precBooked={i !== 0 && i % 7 !== 0 && days[i - 1].type === 'booked'}
          nextBooked={i !== days.length - 1 && i % 7 !== 6 && days[i + 1].type === 'booked'}
        />)
      })}
    </div>
  )
}