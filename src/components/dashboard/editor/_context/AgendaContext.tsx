import { PropsWithChildren, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Check from '@/icons/dashboard/check-circle-full-green.svg'

export const AgendaContext = createContext({
  bookedDays: [] as Date[],
  proposedDays: [] as Date[],

  isModifying: false,
  setIsModifying: (payload: boolean) => {},

  handleSwitchDateStatus: (day: Date, type: string) => {},
  save: () => {}
})

export const AgendaContextProvider = ({children}:PropsWithChildren) => {
  const [bookedDays, setBookedDays] = useState<Date[]>([])
  const [proposedDays, setProposedDays] = useState<Date[]>([])

  const [modifiedDays, setModifiedDays] = useState<Date[]>([])

  const [isModifying, setIsModifying] = useState<boolean>(false)

  const getBookedDays = () => {
    // TODO: get the booked days
    setBookedDays([new Date(2024, 0, 3), new Date(2024, 0, 4), new Date(2024, 0, 5), new Date(2024, 3, 7), new Date(2024, 0, 22), new Date(2024, 0, 23), new Date(2024, 0, 24),])
  }

  const getProposedDays = () => {
    // TODO: get the proposed days
    setProposedDays([new Date(2024, 0, 12), new Date(2024, 0, 13), new Date(2024, 0, 14), new Date(2024, 2, 3), new Date(2024, 2, 4), new Date(2024, 4, 5), new Date(2024, 1, 7)])
  }

  const [newProposedDaysNb, setNewProposedDaysNb] = useState(0)
  const [newRemainingDaysNb, setNewRemainingDaysNb] = useState(0)

  const handleSwitchDateStatus = (day: Date, type: string) => {
    const isAlreadyModified = modifiedDays.find((d) => d.getTime() === day.getTime())
    
    if(isAlreadyModified) setModifiedDays(modifiedDays.filter((d) => d.getTime() !== isAlreadyModified.getTime()))
    else setModifiedDays([...modifiedDays, day])
        
    type === 'remaining' && setNewProposedDaysNb(newProposedDaysNb + 1)
    type === 'proposed' && setNewRemainingDaysNb(newRemainingDaysNb + 1)
  }

  // useEffect(() => {
  //   console.log(modifiedDays);
  // }, [modifiedDays])

  useEffect(() => {
    console.log(proposedDays);
    
  }, [proposedDays])

  const save = () => {
    // TODO: For each modified days switch status, if 'proposed' -> 'remaining', and the opposite
    // and fetch again

    let temp = proposedDays

    modifiedDays.forEach((d) => {
      if (temp.find((td) => td.getTime() === d.getTime())) {        
        temp = temp.filter((td) => td.getTime() !== d.getTime())
      }
      else {
        temp = [...temp, d]
      }
    })

    setProposedDays(temp)
    setModifiedDays([])

    if (newProposedDaysNb > 0) {
      const s = newProposedDaysNb > 1 ? newProposedDaysNb + ' jours ont été ajoutés' : 'Une journée à été ajoutée'
      toast(`${s} à vos disponibilités`, {
        icon: Check
      })
    }

    if (newRemainingDaysNb > 0) {
      const s = newRemainingDaysNb > 1 ? newRemainingDaysNb + ' jours ont été retirés' : 'Une journée à été retirée'
      toast(`${s} de vos disponibilités`, {
        icon: Check
      })     
    }
    
    // getBookedDays()
    // getProposedDays()

    setNewProposedDaysNb(0)
    setNewRemainingDaysNb(0)
  }

  useEffect(() => {
    getBookedDays()
    getProposedDays()
  }, [])

  return (
    <AgendaContext.Provider
      value={{
        bookedDays,
        proposedDays,

        isModifying,
        setIsModifying,

        handleSwitchDateStatus,
        save
      }}
    >
      {children}
    </AgendaContext.Provider>
  )
}