import { RefObject, useEffect, useRef } from "react";

export const useResizeTextArea = (inputElement:RefObject<HTMLTextAreaElement>, value:string | undefined) => {
  const hiddenDiv = useRef<HTMLDivElement>()
  
  useEffect(() => {
      hiddenDiv.current = document.createElement('div')
      hiddenDiv.current.style.display = 'none';
      hiddenDiv.current.style.whiteSpace = 'pre-wrap';
      hiddenDiv.current.style.wordBreak = 'break-word';
      // hiddenDiv.current.style.lineHeight = '1.4';
      // hiddenDiv.current.style.padding = '0 8px'
  }, [])
  
  const resizeTextArea = (value: string | undefined) => {
    if(hiddenDiv.current && inputElement.current) {
      inputElement.current.parentNode!.appendChild(hiddenDiv.current);
      hiddenDiv.current.innerHTML = value ? value + '<br>' : '';
      hiddenDiv.current.style.visibility = 'hidden';
      hiddenDiv.current.style.display = 'block';
      inputElement.current.style.height = value ? hiddenDiv.current.offsetHeight + 'px' : '';
      hiddenDiv.current.style.visibility = 'visible';
      hiddenDiv.current.style.display = 'none';
    }
  }

  useEffect(() => {
    resizeTextArea(value)
  }, [value])
}
