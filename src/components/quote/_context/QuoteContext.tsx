import { StepProps } from "@/components/_shared/UI/Stepper";
import { calculateQuotePrice } from "@/services/quote/quoteApi";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export type QuoteContextType = {
  currentStep: number,
  setCurrentStep: (step: number) => void,

  selectedModel: any,
  setSelectedModel: (model: any) => void,
  selectedDuration: any,
  setSelectedDuration: (duration: any) => void,
  uploadedFiles: File[] | undefined,
  setUploadedFiles: (files: any) => void,

  rushesDuration: number | undefined,
  setRushesDuration: (duration: number) => void,

  imagesRushsDuration: number | undefined,
  setImagesRushsDuration: (duration: number) => void,
  imageRushsNumber: number | undefined,
  setImageRushsNumber: (number: number) => void,

  audioRushsDuration: number | undefined,
  setAudioRushsDuration: (duration: number) => void,
  audioRushsNumber: number | undefined,
  setAudioRushsNumber: (number: number) => void,

  videoRushsDuration: number | undefined,
  setVideoRushsDuration: (duration: number) => void,
  videoRushsNumber: number | undefined,
  setVideoRushsNumber: (number: number) => void,

  price: number | string,

  steps:StepProps[],

  handlePrev: () => void,
  handleNext: () => void,
  
  nextButtonDisabled: boolean,
  setNextButtonDisabled: (val:boolean) => void,
  prevButtonDisabled: boolean,
  setPrevButtonDisabled: (val:boolean) => void,
  defineNavStatus: () => void,
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

  rushesDuration: undefined,
  setRushesDuration: (duration: number) => {},
 
  imagesRushsDuration: undefined,
  setImagesRushsDuration: (duration: number) => {},
  imageRushsNumber: undefined,
  setImageRushsNumber: (number: number) => {},

  audioRushsDuration: undefined,
  setAudioRushsDuration: (duration: number) => {},
  audioRushsNumber: undefined,
  setAudioRushsNumber: (number: number) => {},

  videoRushsDuration: undefined,
  setVideoRushsDuration: (duration: number) => {},
  videoRushsNumber: undefined,
  setVideoRushsNumber: (number: number) => {},

  price: 'Prix',

  steps: [],

  handlePrev: () => {},
  handleNext: () => {},

  nextButtonDisabled: true,
  setNextButtonDisabled: (val:boolean) => {},
  prevButtonDisabled: true,
  setPrevButtonDisabled: (val:boolean) => {},
  defineNavStatus: () => {},
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

  const RUSHES_DURATION_RATIO = 5
  const [rushesDuration, setRushesDuration] = useState<number | undefined>(undefined)

  const [imagesRushsDuration, setImagesRushsDuration] = useState<number | undefined>(undefined)
  const [imageRushsNumber, setImageRushsNumber] = useState<number | undefined>(undefined)

  const [audioRushsDuration, setAudioRushsDuration] = useState<number | undefined>(undefined)
  const [audioRushsNumber, setAudioRushsNumber] = useState<number | undefined>(undefined)

  const [videoRushsDuration, setVideoRushsDuration] = useState<number | undefined>(undefined)
  const [videoRushsNumber, setVideoRushsNumber] = useState<number | undefined>(undefined)

  const visualRushDuration = (videoRushsDuration ?? 0) + (imagesRushsDuration ?? 0)
  const isRushsDurationOk = visualRushDuration && (visualRushDuration >= (Math.max(selectedDuration, 1) * RUSHES_DURATION_RATIO))

  const PRICE_DEFAULT = 'Prix'
  const [price, setPrice] = useState<number | string>(PRICE_DEFAULT)

  const [nextButtonDisabled, setNextButtonDisabled] = useState<QuoteContextType['nextButtonDisabled']>(false)
  const [prevButtonDisabled, setPrevButtonDisabled] = useState<QuoteContextType['prevButtonDisabled']>(false)

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
    text: price.toString(),
    state: step4Status,
    isPrice: true,
    onClick: () => {}
  }]

  // update the quote / price depending on the input values
  useEffect(() => {
    const complexity = selectedModel && selectedModel.worktime || undefined;
    const rushTotalMinutes = rushesDuration && (rushesDuration >= (selectedDuration * RUSHES_DURATION_RATIO)) ? rushesDuration : undefined;
    const videoExpectedMinutes = selectedDuration || undefined;    

    if(complexity && rushTotalMinutes && videoExpectedMinutes) {
      calculateQuotePrice({complexity, rushTotalMinutes, videoExpectedMinutes})
        .then((res) => {
          setPrice(res.data.price.toString() + '€')
        })
        .catch((err) => {
          setPrice(PRICE_DEFAULT)
        })
    } else {
      setPrice(PRICE_DEFAULT)
    }
  }, [selectedModel, selectedDuration, rushesDuration])

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const defineStepStatus = (step:number, cb:(state:StepProps['state']) => void, test:boolean | number | undefined) => {
    let state:StepProps['state']
    if(currentStep === step) state = 'current'
    else {
      test ? state = 'done' : state = 'default';
    }

    cb(state)
  }

  const defineAllStepStatus = () => {
    defineStepStatus(0, setStep1Status, selectedModel !== undefined)
    defineStepStatus(1, setStep2Status, selectedDuration !== undefined)
    defineStepStatus(2, setStep3Status, isRushsDurationOk)
    defineStepStatus(3, setStep4Status, selectedModel && selectedDuration && isRushsDurationOk)
  }

  const defineNavStatus = () => {
    switch(currentStep) {
      case 0 :
        selectedModel === undefined ? setNextButtonDisabled(true) : setNextButtonDisabled(false);
        setPrevButtonDisabled(true);
        break;
      case 1 :
        selectedDuration === undefined && setSelectedDuration(0.5);
        selectedDuration === undefined ? setNextButtonDisabled(true) : setNextButtonDisabled(false);
        setPrevButtonDisabled(false);
        break;
      case 2 :
        isRushsDurationOk ? setNextButtonDisabled(false) : setNextButtonDisabled(true);
        setPrevButtonDisabled(false);
        break;
      case 3 :
        setNextButtonDisabled(true)
        setPrevButtonDisabled(false);
        break;
    }
  }

  useEffect(() => {
    defineAllStepStatus()
    defineNavStatus()
  }, [currentStep, selectedModel, selectedDuration, uploadedFiles, rushesDuration])

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

        rushesDuration,
        setRushesDuration,

        imagesRushsDuration,
        setImagesRushsDuration,
        imageRushsNumber,
        setImageRushsNumber,
      
        audioRushsDuration,
        setAudioRushsDuration,
        audioRushsNumber,
        setAudioRushsNumber,

        videoRushsDuration,
        setVideoRushsDuration,
        videoRushsNumber,
        setVideoRushsNumber,

        price,
        
        steps,

        handlePrev,
        handleNext,

        nextButtonDisabled,
        setNextButtonDisabled,
        prevButtonDisabled,
        setPrevButtonDisabled,
        defineNavStatus,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}