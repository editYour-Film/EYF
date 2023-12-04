import React, { ReactNode, useRef } from "react";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import { TextSplit } from "../../utils/TextSplit";
import Image from "next/image";
import { H3 } from "./typography/H3";

type titleProps = {
  children: ReactNode,
  titleType: 'mainh1' | 'h1' | 'fakeH1' | 'fakeH2' | 'h2' | 'h3' | 'h4' | 'none',
  anim?: boolean | undefined,
  fromRight?: boolean | undefined,
  addDuration?: string | undefined,
  charDelay?: string | undefined,
  split?: boolean | undefined,
  className?: string,
  arrow?: boolean,
  fake?: boolean,
}
export const Title = ({titleType, anim, fromRight, addDuration = '0s', charDelay = '0s', split, className, children, arrow = false, fake = false}: titleProps) => {
  const el = useRef(null)
  let content = children

  if(anim || split) { content = <TextSplit input={children as string} type="word"/> }

  const animClass = `anim-title ${fromRight && 'fromRight'}`

  const renderSwitch: any = (type: any) => {
    switch (titleType) {
      case 'mainh1':
        return <h1 className={`${className ? className : ''} ${anim ? animClass : ''}`} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</h1>
      case 'h1':
        return <H1 className={`${className ? className : ''} ${anim ? animClass : ''}`} fake={fake} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</H1>
      case 'h2':
        return <H2 className={`${className ? className : ''} ${anim ? animClass : ''}`} arrow={arrow} fake={fake} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</H2>
      case 'h3':
        return <H3 className={`${className ? className : ''} ${anim ? animClass : ''}`} fake={fake} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</H3>
      case 'h4':
        return <h4 className={`${className ? className : ''} ${anim ? animClass : ''}`} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</h4>
      case 'none':
        return <div className={`${className ? className : ''} ${anim ? animClass : ''}`} style={{"--duration-var": addDuration, '--char-delay-add': charDelay} as React.CSSProperties}>{content}</div>
    }
  };

  return (
    <div ref={el} className="title">
      {renderSwitch(titleType)}
    </div>
  )
}
