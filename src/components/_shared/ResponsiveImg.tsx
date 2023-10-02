import Image from 'next/image';
import {useEffect, useRef} from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import {Cloudinary} from "@cloudinary/url-gen";

type ResponsiveImgProps = {
  w: {xs:number, sm?:number, md?:number, lg?:number, hd?:number, fullHd?  :number},
  data: any,
  alt: string,
  className?: string,
  isStatic?: boolean
}

export const ResponsiveImg = ({w, data, alt, className, isStatic = false}: ResponsiveImgProps) => {
  const myImage = useRef<string>()
  
  const isXs = useMediaQuery('(max-width: 500px)')
  const isSm = useMediaQuery('(min-width: 501px) and (max-width: 768px)')
  const isMd = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isLg = useMediaQuery('(min-width: 1025px) and (max-width: 1280px)')
  const isHd = useMediaQuery('(min-width: 1281px) and (max-width: 1536px)')
  const isFullHd = useMediaQuery('(min-width: 1537px)')

  const imgW = useRef<number>(w.xs)

  const wXs = w.xs
  const wSm = w.sm ? w.sm : wXs;
  const wMd = w.md ? w.md : wSm;
  const wLg = w.lg ? w.lg : wMd;
  const wHd = w.hd ? w.hd : wLg;
  const wFullHd = w.fullHd ? w.fullHd : wHd;
  
  useEffect(() => {
    if(isStatic) return 

    if(isXs) imgW.current = wXs;
    else if(isSm) imgW.current = wSm;
    else if(isMd) imgW.current = wMd;
    else if(isLg) imgW.current = wLg;
    else if(isHd) imgW.current = wHd;
    else imgW.current = wFullHd; 
  }, [isXs, isSm, isMd, isLg, isHd, isFullHd])

  useEffect(() => {    
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
        apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
      }
    });

    myImage.current = isStatic ? data : cld.image(data.data.attributes.provider_metadata.public_id).resize(fill().width(imgW.current)).format('webp').toURL()
  }, [imgW.current])

  return (<>
    {myImage.current && <Image 
      className={`${className}`}
      src={myImage.current ? myImage.current : ''}
      fill
      loading='eager'
      alt={alt ? alt : ''}
    />}
  </>)
}