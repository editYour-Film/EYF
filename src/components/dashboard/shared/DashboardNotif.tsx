import Bell from '../../../../public/icons/bell.svg'

import Target from '@/icons/dashboard/target.svg'
import Camera from '@/icons/dashboard/camera.svg'
import CheckCircle from '@/icons/dashboard/check-circle.svg'
import Calendar from '@/icons/dashboard/calendar.svg'
import { Ref, createRef, forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { opacity } from '@cloudinary/url-gen/actions/adjust'

interface notif {
  type: string
}

type DashboardNotifProps = {
  notifs: notif[]
}

export const DashboardNotif = ({notifs}: DashboardNotifProps) => {
  const button = useRef(null)
  const notifW = useRef(null)
  const notifInner = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [newNotif, setNewNotif] = useState(false)

  const ctx = useRef<gsap.Context>()

  const notifRefs = useRef<any[]>([])
  notifRefs.current = notifs.map(() => createRef())

  useEffect(() => {
    ctx.current = gsap.context((self) => {
      const openTl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: 'power2.inOut'
        }
      })

      openTl.fromTo(notifW.current, {
        yPercent: -100
      }, {
        yPercent: 0
      }, 0)
      openTl.fromTo(notifInner.current, {
        yPercent: 100
      }, {
        yPercent: 0
      }, 0)

      openTl.fromTo(notifRefs.current.map((item) => { if(item?.current) return item.current }), {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1
      }, 0.1)

      self.add('openIt', () => {
        openTl.restart(); 
      })

      const closeTl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: 'power2.inOut'
        }
      })

      closeTl.fromTo(notifW.current, {
        yPercent: 0
      }, {
        yPercent: -100
      }, 0)
      closeTl.fromTo(notifInner.current, {
        yPercent: 0
      }, {
        yPercent: 100
      }, 0)

      self.add('closeIt', () => {
        closeTl.restart();
      })
    })

    return () => {
      ctx.current?.revert()
    }
  }, [])

  const handleOpenNotif = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {    
    if(isOpen) {
      ctx.current?.openIt()
    }
    else {
      ctx.current?.closeIt()
    }
  }, [isOpen])

  return (
    <>
      <div className="dashboard-notif relative z-20">
        <div 
          ref={button} 
          className="dashboard-notif__icon relative flex justify-center items-center rounded-3xl px-4 h-full bg-black border z-10"
          onClick={() => { handleOpenNotif() }}
        >
          <Bell />
          {newNotif && <div className="absolute bottom-0 right-0 bg-violet w-3 h-3 rounded-full"></div>}
        </div>
        <div ref={notifW} className="dashboard-notif__wrapper absolute top-full translate-y-2 opacity-1 rounded-2xl w-[300px] right-0 overflow-hidden z-0">
          <div ref={notifInner} className="dashboard-notif__wrapper--inner bg-background-card flex rounded-2xl border p-2 gap-2 flex-col">
            {notifs.map((notif, i) => {
              return <Notif key={i} type={notif.type} ref={notifRefs.current[i]} ></Notif>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

type NotifProps = {
  type: string
}

const Notif = forwardRef<HTMLDivElement, NotifProps>(function Notif ({type}, ref) {  
  let icon = null
  let title = null
  let text = null

  switch (type) {
    case 'upToDate':
      icon = <Target />
      title = 'Vous êtes à jour'
      text = 'Pas de nouvel évènement aujourd\'hui.'
    break;
    case 'proposition':
      icon = <Camera />
      title = 'Une proposition vous attend'
      text = 'Une mission de 3 jours à partir du 24 mars en attente de confirmation.'
    break;
    case 'missionEnded': 
      icon = <CheckCircle />
      title = 'Mission terminée'
      text = 'Les fichiers de la mission A23430F sont supprimés. Merci !'
    break;
    case 'agenda': 
      icon = <Calendar />
      title = 'Préparez votre agenda pour le mois prochain'
      text = 'Vous n\'avez pas partagé vos disponibilités pour le mois prochain. Gagnez en visibilité en partageant votre calendrier.'
    break;  
  }

  return (
    <div ref={ref} className='notif py-2 px-4 flex items-start gap-4'>
      <div className='notif-icon'>
        {icon}
      </div>
      <div className="notif-content">
        <div className="notif-title text-violet font-medium">{title}</div>
        <div className="notif-text text-sm">{text}</div>
      </div>
    </div>
  )
})