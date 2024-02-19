import { useEffect, useState, useRef, createRef, useMemo } from 'react';
import gsap from 'gsap';
import { useSwipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux'
import { toWatch, toRegular, toPause} from "@/store/slices/cursorSlice"
import {videoInterface} from './ConfidenceSection'
import { secureUrl } from '@/utils/utils';

interface slideInterface {
  el: HTMLDivElement,
  editorEl: HTMLDivElement,
  spanEl: HTMLDivElement,
  videoEl?: HTMLVideoElement,
  i: number,
  position: number,
  isActive: boolean
}

type VideoSliderPros = {
  videos: Array<videoInterface>
}

export const VideoSlider = ({videos}: VideoSliderPros) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTweening, setisTweening] = useState(false)

  const offset = useRef(0)
  const direction = useRef(0)

  const moveOffset = useRef(0)
  const videoCardsWrapper = useRef<any>()

  const dispatch = useDispatch()

  const videosWRef = useRef<any>([]);
  videosWRef.current = videos?.map((element, i) => videosWRef.current[i] ?? createRef<HTMLDivElement>());

  const videosRef = useRef<any>([]);
  videosRef.current = videos?.map((element, i) => videosRef.current[i] ?? createRef<React.Ref<HTMLDivElement>>());

  const titlesRef = useRef<any>([]);
  titlesRef.current = videos?.map((element, i) => titlesRef.current[i] ?? createRef<React.Ref<HTMLDivElement>>());

  const editorsRef = useRef<any>([]);
  editorsRef.current = videos?.map((element, i) => editorsRef.current[i] ?? createRef<React.Ref<HTMLDivElement>>());

  const spanRef = useRef<any>([]);
  spanRef.current = videos?.map((element, i) => spanRef.current[i] ?? createRef<React.Ref<HTMLDivElement>>());

  const ctx = useMemo(() => gsap.context(() => {}, videoCardsWrapper), []);

  const slides = useRef<any>([])

  useEffect(() => {
    const cb = () => { handleResize() }

    window.addEventListener('resize', cb)

    videosWRef.current?.forEach((el:any, i:number) => {  
      const slide: slideInterface = {
        el: el?.current,
        editorEl: editorsRef.current[i].current,
        videoEl: videosRef.current[i].current,
        spanEl: spanRef.current[i].current,
        i,
        position: i !== videosWRef.current.length - 1 && i !== videosWRef.current.length - 2 
          ? i
          : i === videosWRef.current.length - 1 
          ? -1
          : -2,
        isActive: i === 0 ? true : false
      }
      slides.current.push(slide)
    })

    return () => {
      slides.current = []
      window.removeEventListener('resize', cb)
      ctx && ctx.revert()
    };
  }, [])

  useEffect(() => {  
    offset.current = videosWRef.current ? videosWRef.current[0].current.offsetWidth : 0
    
    initContext();

    return () => ctx.revert();
  }, [ctx])

  useEffect(() => {  
    moveOffset.current = currentIndex * offset.current
  
    ctx && 
    ctx.add(() => {
      const tl = gsap.timeline({
        onStart: () => {
          setisTweening(true)
        },
        onComplete: () => {
          setisTweening(false)
        }
      })
      
      slides.current.forEach((ref:any, i:number) => {
        const filter = ref.el.querySelector(`.filter`)
        
        if (ref.i === currentIndex) {
          filter && tl.to(filter, {
            opacity: 0.5,
            ease: 'expo.out',
            duration: 1
          }, 0)
        } else {
          filter && tl.to(filter, {
            opacity: 1,
            ease: 'expo.out',
            duration: 1
          }, 0)
        }

        if (ref.i === currentIndex) {
          spanRef.current[i] && tl.to(spanRef.current[i].current, {
            scaleY: 1,
            opacity: 1,
            duration: 0.3,
          }, 0)
        } else if (Math.abs(i - currentIndex) < 2) {
          spanRef.current[i] && tl.to(spanRef.current[i].current, {
            scaleY: 1 - 0.15,
            opacity: 0.5,
            duration: 0.3,
          }, 0)
        } else {
          spanRef.current[i] && tl.to(spanRef.current[i].current, {
            scaleY: 1 - 0.36,
            opacity: 0.3,
            duration: 0.3,
          }, 0)
        }
        

        if (ref.el) {
          if(ref.position === -2 && direction.current === 1) {
            tl.set(ref.el, {
              x: offset.current * ref.position,
            }, 0)
          } else if (ref.position === slides.current.length - 3 && direction.current === -1) {
            tl.set(ref.el, {
              x: offset.current * ref.position,
            }, 0)
          } else {
            tl.to(ref.el, {
              x: offset.current * ref.position,
              duration: 1,
              ease: "expo.out"
            }, 0)
          }
        }
      });
    })
  }, [currentIndex])
  
  const initContext = () => {
    ctx && ctx.add(() => { 
      slides.current.forEach((ref:any, i:number) => {        
        ref.el && gsap.set(ref.el, {
          left: '50%',
          xPercent: -50,
          x: offset.current * ref.position + moveOffset.current
        })
      });
    })
  }

  const handleResize = () => {
    offset.current = videosWRef.current[0].current ? videosWRef.current[0].current.offsetWidth : window.innerWidth * 0.75

    initContext()
    handleGoTo(0, slides.current[0].position)
  }

  const updatePosition = () => {
    slides.current.forEach((slide: slideInterface) => {
      if (slide.videoEl) {
        slide.videoEl.pause()
        slide.videoEl.currentTime = 0
        slide.videoEl.classList.remove('mouse-over');
        slide.videoEl.classList.remove('playing');
      }

      if(direction.current === 1) {
        if (slide.position !== slides.current.length - 3) slide.position += 1
        else slide.position = -2
      } else {
        if (slide.position !== -2) slide.position -= 1
        else slide.position = slides.current.length - 3
      }
    })
  }

  const handlePrev = () => {
    if (isTweening) return  

    setCurrentIndex(prevCurrentIndex => prevCurrentIndex === 0 ? videos.length - 1 : prevCurrentIndex - 1)
    direction.current = 1
    updatePosition()
  }

  const handleNext = () => {
    if (isTweening) return    

    setCurrentIndex(prevCurrentIndex =>  prevCurrentIndex === videos.length - 1 ? 0 : prevCurrentIndex + 1)    
    direction.current = -1
    updatePosition()    
  }

  const handleGoTo = (i:number, pos:number|undefined) => {
    if (isTweening) return    

    const diff = pos ? -pos : 0;
    let distance = Math.abs(diff);
    direction.current = diff < 0 ? -1 : 1
    
    while(distance > 0) {      
      updatePosition()
      distance -= 1
    }

    setCurrentIndex(i)
  }

  const handleTimeUpdate = (video: HTMLVideoElement, i:number) => {
    if(!video.classList.contains('mouse-over') || i !== currentIndex) return

    let continueStream = false;
    if (video.currentTime < 2) {
      continueStream = true
    } else {
      continueStream = false
    }

    if(!continueStream && !video.classList.contains('playing')) {
      if( i !== currentIndex ) return

      if(!video.paused) {
        video.pause()
        video.currentTime = 0
      }
      if(video.paused) video.play()
    } 
  }

  const handleMouseLeave = (video: HTMLVideoElement, i:number) => {
    if( i !== currentIndex ) return

    dispatch(toRegular())

  }

  const handleMouseEnter = (video: HTMLVideoElement, i:number) => {
    if( i !== currentIndex ) {
      return
    }
    
    video.classList.contains('playing') ? dispatch(toPause()) : dispatch(toWatch())
  }

  const handleVideoClick = (video: HTMLVideoElement, i:number) => {
    if( i !== currentIndex ) {
      const pos = video.dataset.position ? parseInt(video.dataset.position) : 0
      handleGoTo(i, pos)
    } else {
      if(video.classList.contains('playing') ) {
        video.classList.remove('playing')
        video.pause()
        dispatch(toWatch())
      } else {
        video.classList.add('playing')
        video.currentTime = 0
        video.volume = 1
        video.play()
        dispatch(toPause())
      }
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => { 
      handleNext() 
    },
    onSwipedRight: () => { 
      handlePrev() 
    },

    trackMouse: false,
  });
  

  return (
    <div 
      {...swipeHandlers} 
      className={`flex flex-col items-center w-full overflow-hidden`}
      onMouseLeave={() => {dispatch(toRegular())}}
      >
      <div 
        ref={videoCardsWrapper} 
        className={`relative md:h-[38vw] md:lg:h-[29vw] w-full md:flex md:flex-row md:gap-20`}
      >
        {videos?.map((video, i) => {          
          return (
            <div key={i} ref={videosWRef.current[i]} className={`relative md:absolute w-[75vw] h-[38vw] lg:w-[57vw] lg:h-[29vw] flex-shrink-0 px-1 md:px-2 lg:px-4 origin-bottom`}>
              <div className="relative rounded-dashboard-button-square-radius w-full h-full overflow-hidden after:content-[''] after:w-full after:h-full after:border after:absolute after:top-0 after:left-0 after:z-10 after:rounded-dashboard-button-square-radius after:pointer-events-none">
                <div className={`filter absolute w-full h-full text-blue text-lg z-10 flex justify-center items-center pointer-events-none bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-black `}></div>
                <video 
                  ref={videosRef.current[i]} 
                  className="w-full h-full object-cover pointer-events-auto"
                  data-position = {slides.current[i]?.position}
                  onClick={() => {
                    handleVideoClick(videosRef.current[i].current, i)
                  }}
                  onMouseOver={() => {
                    handleMouseEnter(videosRef.current[i].current, i)
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave(videosRef.current[i].current, i)
                  }}
                  onTimeUpdate = {(event) => {
                    handleTimeUpdate(videosRef.current[i].current, i)
                  }}
                  onPlay={ () => { setIsPlaying(true) }}
                  onPause={() => { setIsPlaying(false)}}
                  >
                  <source src={secureUrl(video.path)} type="video/mp4" />
                </video>
              </div>
            </div>
          )
        })}
      </div>

      <div className="w-[75vw] lg:w-[57vw] px-1 md:px-2 lg:px-4 mt-dashboard-spacing-element-medium flex flex-row justify-between items-center text-soyMilk-500 text-[17px] font-light">
          <div>{currentIndex + 1 < 10 ? "0" + (currentIndex + 1) : (currentIndex + 1)}</div>

          <div className='w-4/6 h-[25px] flex flex-row justify-center'>
            {videos?.map((video, i) => {
              return (
              <div 
                key={i} 
                ref={spanRef.current[i]} 
                className={`w-[1px] h-full border-l-2 border-dashboard-button-stroke-hover opacity-10 mx-[6px] cursor-pointer`}
                onClick={() => {
                  handleVideoClick(videosRef.current[i].current, i)
                }}
                ></div>)
            })}
          </div>

          <div>{videos?.length < 10 ? "0" + (videos?.length) : (videos?.length)}</div>
        </div>
    </div>
  )
}