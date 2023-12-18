import { StepProps } from "@/components/_shared/UI/Stepper";
import { CatalogContext } from "@/components/catalogue/_context/CatalogContext";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type QuoteContextType = {
  currentStep: number,
  setCurrentStep: (step: number) => void,

  selectedModel: any,
  setSelectedModel: (model: any) => void,
  selectedDuration: any,
  setSelectedDuration: (duration: any) => void,
  uploadedFiles: any,
  setUploadedFiles: (files: any) => void,

  steps:StepProps[],

  handlePrev: () => void,
  handleNext: () => void,
  nextButtonDisabled: boolean
}

const defaultValue:QuoteContextType = {
  currentStep: 0,
  setCurrentStep: (step) => {},

  selectedModel: undefined,
  setSelectedModel: (model: any) => {},
  selectedDuration: undefined,
  setSelectedDuration: (duration: any) => {},
  uploadedFiles: undefined,
  setUploadedFiles: (files: any) => {},

  steps: [],

  handlePrev: () => {},
  handleNext: () => {},
  nextButtonDisabled: true,
}
export const QuoteContext = createContext(defaultValue)

export const QuoteContextProvider = ({children}:PropsWithChildren) => {
  const [step1Status, setStep1Status] = useState<StepProps['state']>('current')
  const [step2Status, setStep2Status] = useState<StepProps['state']>('default')
  const [step3Status, setStep3Status] = useState<StepProps['state']>('default')
  const [step4Status, setStep4Status] = useState<StepProps['state']>('disabled')

  const [currentStep, setCurrentStep] = useState<QuoteContextType['currentStep']>(0)
  const [selectedModel, setSelectedModel] = useState<QuoteContextType['selectedModel']>(undefined)
  const [selectedDuration, setSelectedDuration] = useState<QuoteContextType['selectedDuration']>(undefined)
  const [uploadedFiles, setUploadedFiles] = useState<QuoteContextType['uploadedFiles']>(undefined)

  const [nextButtonDisabled, setNextButtonDisabled] = useState<QuoteContextType['nextButtonDisabled']>(false)	

  const steps:StepProps[] = [{
    hasNumber: true,
    number: 1,
    text: 'Modèle',
    state: step1Status,
    onClick: () => { 
      setCurrentStep(0)
    }
  },
  {
    hasNumber: true,
    number: 2,
    text: 'Durée',
    state: step2Status,
    onClick: () => { 
      setCurrentStep(1)
    }
  },
  {
    hasNumber: true,
    number: 3,
    text: 'Fichiers',
    state: step3Status,
    onClick: () => { 
      setCurrentStep(2)
    }
  },
  {
    hasNumber: false,
    text: 'Prix',
    state: step4Status,
    onClick: () => {}
  }]

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  useEffect(() => {
    switch(currentStep) {
      case 0 :
        setStep1Status('current')

        selectedModel === undefined ? setNextButtonDisabled(true) : setNextButtonDisabled(false) 
        selectedDuration === undefined ? setStep2Status('default') : setStep2Status('done')
        break;
      case 1 :
        setStep1Status('done')
        setStep2Status('current')
        
        selectedDuration === undefined ? setNextButtonDisabled(true) : setNextButtonDisabled(false) 
        uploadedFiles.length === 0 ? setStep3Status('default') : setStep3Status('done')
        
        break;
      case 2 :
        setStep2Status('done')
        setStep3Status('current')

        uploadedFiles.length === 0 ? setNextButtonDisabled(true) : setNextButtonDisabled(false) 
        break;
      case 3 :
        break;
    }    
  }, [currentStep, selectedModel, selectedDuration, uploadedFiles])

  return (
    <QuoteContext.Provider
      value={{
        currentStep,
        setCurrentStep,

        selectedModel,
        setSelectedModel,

        selectedDuration,
        setSelectedDuration,

        uploadedFiles,
        setUploadedFiles,
        
        steps,

        handlePrev,
        handleNext,

        nextButtonDisabled
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}