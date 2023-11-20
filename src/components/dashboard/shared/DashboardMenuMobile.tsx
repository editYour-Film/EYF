import Close from '@/icons/x-circle.svg'
import Insta from '@/icons/instagram.svg'
import Linkedin from '@/icons/linkedin.svg'
import Lettrage from '@/img/EDITYOUR.svg'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeDashboardMenu, openDashboardMenu } from "@/store/slices/dashboardMenuSlice";
import gsap from "gsap";
import { useMediaQuery, useWindowSize } from "@uidotdev/usehooks";
import { links } from "../editor/data/links";
import { useEffect, useRef, useState } from 'react';
import { Menu } from './Menu';

type DashboardMenuMobileProps = {
  className?: string;
  menu: any;
}

export const DashboardMenuMobile = ({ className, menu }: DashboardMenuMobileProps) => {
  const menuContainer = useRef(null)
  const isOpen = useSelector((state: RootState) => state.dashboardMenu.isOpen)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isTweening, setIsTweening] = useState(false)

  const ctx = useRef<gsap.Context>()
  const wSize = useWindowSize()

  const setGsapContext = () => {
    const context = gsap.context((self) => {
      gsap.set(menuContainer.current, {
        x: window.innerWidth * 1.1
      })

      self.add('open', () => {
        const tl = gsap.timeline({
          onStart: () => {
            setIsTweening(true)
          },
          onComplete: () => {
            setIsTweening(false)
          }
        })

        tl.to(menuContainer.current, {
          x: 0,
          duration: 1,
          ease: 'power4.out'
        })
      })

      self.add('close', () => {
        const tl = gsap.timeline({
          onStart: () => {
            setIsTweening(true)
          },
          onComplete: () => {
            setIsTweening(false)
          }
        })

        tl.to(menuContainer.current, {
          x: window.innerWidth * 1.1,
          duration: 0.4,
          ease: 'power2.in'
        })
      })
    })

    return context
  }

  const closeMenuKeyboard = (e:KeyboardEvent) => {
    if(e.key === 'Escape') {
      if (isOpen) dispatch(closeDashboardMenu())
    }
  }

  useEffect(() => {
    ctx.current = setGsapContext()

    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [])

  const handleOpen = () => {
    ctx.current && ctx.current.open()
  }

  const handleClose = () => {
    ctx.current && ctx.current.close()
  }

  useEffect(() => {
    if (isOpen) {
      handleOpen()
    }

    else {
      handleClose()
    }

    window.addEventListener('keydown', closeMenuKeyboard)
    return () => {
      window.removeEventListener('keydown', closeMenuKeyboard)
    }

  }, [isOpen])

  useEffect(() => {
    ctx.current = setGsapContext()

    isOpen && dispatch(closeDashboardMenu())
  }, [wSize])

  return (
    <>
      {!isMobile 
        ? false
        : <div 
        ref={menuContainer}
        className={`menu-mobile fixed left-0 w-full h-screen z-popup bg-dashboard-button-dark ${className ?? ''}`}>
        <div className="absolute w-full flex flex-col gap-[50px] items-end bottom-[100px] pr-dashboard-mention-padding-right-left">
          <Menu items={menu} />
          <div className="menu-mobile__under flex flex-row items-center gap-[23px]">
            <a
              href={links.INSTA}
              target="_blank"
              rel="noopener"
            >
              <Insta className='svg-color-dashboard-button-white-default w-[30px] h-[30px]'/>
            </a>
            <a
              href={links.LINKEDIN}
              target="_blank"
              rel="noopener"
            >
              <Linkedin className='svg-color-dashboard-button-white-default w-[30px] h-[30px]'/>
            </a>
            <div 
              onClick={() => {              
                dispatch(closeDashboardMenu())
              }}
              className="w-[30px] h-[30px]"
            >
              { <Close />}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full "><Lettrage /></div>
      </div>
      }
      
    </>
  );
};