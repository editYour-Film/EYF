import Link from 'next/link'
import { ReactNode } from 'react'

type SimpleLinkProps = {
  href: string | object,
  children: ReactNode,
  className?: string
}
export const SimpleLink = ({href, children, className}:SimpleLinkProps) => {
  return (
    <Link className={`underline text-dashboard-text-button-white-contrast-low text-opacity-40 hover:text-opacity-60 transition-colors ${className ?? ''} `} href={href}>{children}</Link>
  )
}