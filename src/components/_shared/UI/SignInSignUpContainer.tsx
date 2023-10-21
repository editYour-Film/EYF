import { ReactNode, forwardRef } from "react"

type SignInSignUpContainerProps = {
  children: ReactNode,
  className?: string
}

export const SignInSignUpContainer = forwardRef<HTMLDivElement, SignInSignUpContainerProps>(function SignInSignupContainer({children, className}, ref) {
  return (<div ref={ref} className={`flex flex-col items-center gap-dashboard-spacing-element-medium ${className}`}>
    {children}
  </div>)
})