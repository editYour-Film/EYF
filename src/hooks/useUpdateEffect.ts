import { DependencyList, useEffect, useRef } from "react"

export const useUpdateEffect = (cb:Function, dependencies: DependencyList | undefined) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if(isMounted.current) {
      cb()
    } else {
      isMounted.current = true
    }
  }, dependencies)
}