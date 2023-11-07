import routes from '@/routes'
import Link from 'next/link'

import Fb from '@/icons/facebook.svg'
import In from '@/icons/instagram.svg'
import Lkd from '@/icons/linkedin.svg'
import TwtX from '@/icons/twitter-x.svg'
import Logo from '@/icons/logo.svg'

export const FooterDashboard = () => {
  const sublinks = [
    {
      label: `© ${new Date().getFullYear()} Prodyour.film. Tout droits réservés.`,
    },
    {
      label: 'CGU',
      url: routes.CGU
    },
    {
      label: 'CGU Monteur',
      url: routes.CGUEDITOR
    },
    {
      label: 'Mentions Légales',
      url: routes.ML
    }
  ]

  return (
    <div className="footer-dashboard flex flex-col gap-[50px] px-dashboard-mention-padding-right-left md:px-0 pt-[20px] pb-[80px]">
      <div className='footer-dashboard__main flex flex-col md:flex-row gap-dashboard-button-separation-spacing justify-between w-full pr-[30px]'>
        <div className='flex flex-row gap-[20px]'>
          <div>
            <Logo className='w-[48px] h-[48px]'/>
          </div>
          <div>
            <div className='text-soyMilk font-medium'>Un peu de nous dans votre feed ?</div>
            <div className='text-dashboard-text-description-base font-medium'>Suivez-nous 👋</div>
          </div>
        </div>


        <div className='display flex gap-padding-medium'>
          <a href='' rel='noopener' target='_blank'><Fb className='svg-color-soyMilk hover:svg-color-blueBerry w-[35px] h-[35px]'/></a>
          <a href='' rel='noopener' target='_blank'><In className='svg-color-soyMilk hover:svg-color-blueBerry w-[35px] h-[35px]'/></a>
          <a href='' rel='noopener' target='_blank'><Lkd className='svg-color-soyMilk hover:svg-color-blueBerry w-[35px] h-[35px]'/></a>
          <a href='' rel='noopener' target='_blank'><TwtX className='svg-color-soyMilk hover:svg-color-blueBerry w-[35px] h-[35px]'/></a>
        </div>
      </div>
      <div className="footer-dashboard__sub flex flex-col md:flex-row gap-padding-medium">
        {sublinks && sublinks.length > 0 && sublinks.map((link, i) => {
          return (
            <div className='text-dashboard-text-disabled'>
              {link.url && <Link href={link.url} className='hover:text-blueBerry transition-colors'>{link.label}</Link>}
              {!link.url && <div>{link.label}</div> }
            </div>
          )
        })}
      </div>
    </div>
  )
}