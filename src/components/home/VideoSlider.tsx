import styles from '@/styles/components/VideoSlider.module.scss';
import { useEffect, useState, useRef, createRef, useMemo } from 'react';
import gsap from 'gsap';
import { Title } from '../_shared/Title';
import { useSwipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux'
import { toWatch, toRegular, toPause} from "@/store/slices/cursorSlice"
import {videoInterface} from './ConfidenceSection'

import { streamingProfile } from "@cloudinary/url-gen/actions/transcode";
import { CloudinaryVideo } from "@cloudinary/url-gen/assets/CloudinaryVideo";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import {AdvancedVideo} from '@cloudinary/react';

interface slideInterface {
  el: HTMLDivElement,
  titleEl: HTMLDivElement,
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
  const titleWrapper = useRef<any>()

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

  const [cldVideos, setCldVideos] = useState<CloudinaryVideo[]>()

  useEffect(() => {
    const cb = () => { handleResize() }

    window.addEventListener('resize', cb)

    const _cldVideos:CloudinaryVideo[] = [] 
    videos.forEach(vid => {
      _cldVideos.push(
        new CloudinaryVideo(vid.publicId, {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
          apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
        })
        .delivery(format(auto()))
      )
    });

    setCldVideos(_cldVideos)

    videosWRef.current?.forEach((el:any, i:number) => {  
      const slide: slideInterface = {
        el: el?.current,
        titleEl: titlesRef.current[i].current,
        editorEl: editorsRef.current[i].current,
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
      window.removeEventListener('resize', cb)
    };
  }, [])

  useEffect(() => {
    cldVideos?.forEach((video, i) => {      
      slides.current[i].videoEl = videosRef.current[i].current
    })    
  }, [cldVideos])

  useEffect(() => {  
    offset.current = videosWRef.current ? videosWRef.current[0].current.offsetWidth : 0
    
    initContext();

    return () => ctx.revert();
  }, [ctx])

  useEffect(() => {  
    moveOffset.current = currentIndex * offset.current
  
    ctx && 
    ctx.add(() => {
      setisTweening(true)

      const tl = gsap.timeline({
        onComplete: () => {
          setisTweening(false)
        }
      })
      
      slides.current.forEach((ref:any, i:number) => {
        const filter = ref.el.querySelector(`.filter`)
        
        if (ref.i === currentIndex) {
          tl.to(filter, {
            opacity: 0.5
          }, 0.2)
        } else {
          tl.to(filter, {
            opacity: 1
          }, 0)
        }

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
            duration: 0.8,
            ease: "power2.inOut"
          }, 0)
        }

        if(i === currentIndex) {
          tl.to(ref.el, {
            scale: 1.0,
            ease: "power3.out"
          }, 0.5)
          tl.to(ref.spanEl, {
            opacity: 1
          }, 0)
        } else {
          tl.to(ref.el, {
            scale: 0.90
          }, 0)
          tl.to(ref.spanEl, {
            opacity: 0.4
          }, 0)
        }

        const titleDuration = 0.5;
        if(i === currentIndex) {
          tl.fromTo([ref.titleEl.querySelectorAll('.char-content'), ref.editorEl.querySelectorAll('.char-content')], {
            yPercent: 120,
          },{
            yPercent: 0,
            stagger: 0.01,
            ease:'power2.out',
            duration: titleDuration
          }, titleDuration)
        } else {
          tl.to([ref.titleEl.querySelectorAll('.char-content'), ref.editorEl.querySelectorAll('.char-content')], {
            yPercent: -100,
            stagger: 0.01,
            ease:'power.in',
            duration: titleDuration
          }, 0)
        }
        
      });
    })
  }, [currentIndex])
  
  const initContext = () => {
    ctx && ctx.add(() => { 
      slides.current.forEach((ref:any, i:number) => {        
        gsap.set(ref.el, {
          left: '50%',
          xPercent: -50,
          x: offset.current * ref.position + moveOffset.current
        })

        setTimeout(() => {
          if(i !== currentIndex) {                    
            gsap.set([ref.titleEl.querySelectorAll('.char-content'), ref.editorEl.querySelectorAll('.char-content')], {
              yPercent: -100
            })
          }
        }, 100)

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

    if(!video.classList.contains('playing')) {
      // video.classList.remove('mouse-over');
      // video.currentTime = 0
      // video.pause()
    }
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
      className={`${styles.wrapper} flex flex-col items-center w-full overflow-hidden`}
      onMouseLeave={() => {dispatch(toRegular())}}
      >
      <div 
        ref={videoCardsWrapper} 
        className={`${styles.wrapper} relative md:h-[38vw] md:lg:h-[29vw] w-full md:flex md:flex-row md:gap-20`}
      >
        {videos?.map((video, i) => {          
          return (
            <div key={i} ref={videosWRef.current[i]} className={`${styles.videoW} relative md:absolute w-[75vw] h-[38vw] lg:w-[57vw] lg:h-[29vw] flex-shrink-0 px-1 md:px-2 lg:px-4 origin-bottom`}>
              <div className="rounded-xl w-full h-full overflow-hidden">
                <div className={`${styles.filter} filter absolute w-full h-full text-blue text-lg z-10 flex justify-center items-center pointer-events-none`}></div>
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
                  <source src={video.path} type="video/mp4" />
                </video>
                
                {/* {videos?.length && <video 
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
                  onTimeUpdate = {() => {
                    handleTimeUpdate(videosRef.current[i].current, i)
                  }}
                  onPlay={ () => { setIsPlaying(true) }}
                  onPause={() => { setIsPlaying(false)}}
                >
                  <source src=''/>
                </video>} */}

              </div>
            </div>
          )
        })}
      </div>

      <div className={`hidden md:block w-[75vw] lg:w-[57vw] px-1 md:px-2 lg:px-4 n27 text-xl uppercase font-light mt-4`}>
        <div className="w-full flex flex-col gap-5 md:flex-row justify-between h-4">
          <div ref={titleWrapper} className='relative w-9/12'>
          {videos?.map((video, i) => {
            return (
              <div ref={titlesRef.current[i]} key={i} className={`${currentIndex === i ? 'active' : ''} absolute top-0 left-0`}>
                <Title titleType='none' split>{video.title}</Title>
              </div>
            )
          })}
          </div>
          <div className="relative text-primary-middle">
            {videos?.map((video, i) => {
              return (
                <div ref={editorsRef.current[i]} key={i} className={`${currentIndex === i ? 'active' : ''} absolute top-0 md:right-0`}>
                  <Title titleType='none' split>{video.madeBy}</Title>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden w-full md:flex flex-row justify-between items-center mt-10 md:mt-5">
          <div>{currentIndex + 1 < 10 ? "0" + (currentIndex + 1) : (currentIndex + 1)}</div>
          <div
            className='cursor-pointer opacity-60 hover:opacity-100 transition-opacity'
            onClick={() => {
              handlePrev()
            }}

          > {'<'} </div>
          <div className='w-4/6 h-[15px] flex flex-row justify-between'>
            {videos?.map((video, i) => {
              return (
              <div 
                key={i} 
                ref={spanRef.current[i]} 
                className={`w-[10px] h-full border-l-2 border-white mx-3 cursor-pointer`}
                onClick={() => {
                  handleVideoClick(videosRef.current[i].current, i)
                }}
                ></div>)
            })}
          </div>
          <div
            className='cursor-pointer opacity-60 hover:opacity-100 transition-opacity'
            onClick={() => {
              handleNext()
            }}
          > {'>'} </div>
          <div>{videos?.length < 10 ? "0" + (videos?.length) : (videos?.length)}</div>
        </div>

      </div>
    </div>
  )
}