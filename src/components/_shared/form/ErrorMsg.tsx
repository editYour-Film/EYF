import { ReactNode } from "react"

type ErrorMsgProps = {
  children: ReactNode,
  className: string
}

export const ErrorMsg = ({children, className}:ErrorMsgProps) => {
  return (
    <p className={`text-sm bg-error-bg text-error border p-4 rounded-lg ${className}`}>{children}</p>
  )
}