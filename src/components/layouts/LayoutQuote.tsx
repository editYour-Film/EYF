import HeaderQuote from "../_shared/HeaderQuote";
import { useDispatch } from "react-redux";
import { PropsWithChildren, useContext, useEffect } from "react";
import { disableCustomCursor } from "@/store/slices/cursorSlice";
import { GradientFollowMouse } from "../_shared/UI/GradientFollowMouse";
import { QuoteContext, QuoteContextProvider } from "../quote/_context/QuoteContext";
import { CatalogContext, CatalogContextProvider } from "../catalogue/_context/CatalogContext";
import { PopupDetail } from "../catalogue/PopupDetail";
import { IslandButton } from "../_shared/buttons/IslandButton";

import ArrowLeft from '@/icons/arrow-left.svg'
import ArrowRight from '@/icons/arrow-right.svg'
import { MorePanel } from "../catalogue/Catalog";

type LayoutMainProps = {
  children: React.ReactNode;
};

const LayoutQuote = ({children }: LayoutMainProps) => {
  const dispatch = useDispatch()
  const quoteContext = useContext(QuoteContext)

  useEffect(() => {
    dispatch(disableCustomCursor())
  }, [])

  return (
    <>
      <div className="relative bg-blackBerry min-h-screen w-full">
        <QuoteContextProvider>
          <HeaderQuote step={quoteContext.currentStep} />
          
          <main className="w-full md:pt-navbar-h">
            <div className="fixed z-0 w-screen h-screen overflow-hidden">
              <GradientFollowMouse/>
            </div>

            <div className="relative z-1">
              <CatalogContextProvider>
                <Content>{children}</Content>

                <div className="relative w-full overflow-hidden z-10">
                  <MorePanel isQuote/>
                </div>

                <PrevNextNav />
              </CatalogContextProvider>
            </div>
          </main>
        
        </QuoteContextProvider>
      </div>
    </>
  );
};

export default LayoutQuote;

const Content = ({children}:PropsWithChildren) => {
  const catalogContext = useContext(CatalogContext)
  return (
    <>
      <div className="relative z-10">
        {children}
      </div> 

      <PopupDetail
        trigger={catalogContext.openDetailPanel} 
        onClose={() => { 
          catalogContext.setOpenDetailPanel(false)
        }} 
        onClosed={() => { catalogContext.setDetailModel(undefined) }}
      />
    </>
  )
}

const PrevNextNav = () => {
  const quoteContext = useContext(QuoteContext)
  const catalogContext = useContext(CatalogContext)

  return (
    <div className="fixed w-full flex justify-between bottom-0 px-[44px] pb-dashboard-specific-radius z-buttons pointer-events-none">
      <IslandButton 
        type="tertiary"
        Icon={ArrowLeft}
        label="Retour"
        disabled={quoteContext.currentStep === 0}
        onClick={() => { quoteContext.handlePrev() }}
        className="pointer-events-auto"
      />
      <IslandButton 
        type="tertiary"
        Icon={ArrowRight}
        label="Suivant"
        disabled={quoteContext.nextButtonDisabled}
        onClick={() => { 
          quoteContext.handleNext() 
          catalogContext.setShowMorePanel(false)
        }}
        className="pointer-events-auto"
      />
    </div>
  )
}
