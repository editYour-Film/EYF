import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import * as tokens from '~/theme'

import {loadStripe} from '@stripe/stripe-js';
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import Input from "@/components/_shared/form/Input";
import { Checkbox } from "@/components/_shared/form/inputs/CheckBox";
import routes from "@/routes";
import { SimpleLink } from "@/components/_shared/SimpleLink";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { Appearance } from "@stripe/stripe-js";
import { QuoteContext } from "@/components/quote/_context/QuoteContext";
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) : undefined;

export const PaiementTab = () => {
  const quoteContext = useContext(QuoteContext)
  const [clientSecret, setClientSecret] = useState("");
  const [CGU, setCGU] = useState(false)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  

  const appearance:Appearance = {
    theme: 'night',

    variables: {
      colorPrimary: tokens.base_Edy_blueBerry,
      colorBackground: tokens.dashboard_background_content_area,
      colorText: tokens.base_Edy_soyMilk,
      colorTextPlaceholder: tokens.dashboard_text_title_white_high,
      colorDanger: tokens.dashboard_warning,
      fontFamily: tokens.font_default.join(', '),
      spacingUnit: '2px',
      borderRadius: '4px',
    },

    rules: {
      '.Input': {
        border: `1px solid ${tokens.dashboard_button_stroke_default}`,
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
        // backgroundColor: 'transparent',
      },
      '.Label': {
        color: tokens.dashboard_text_description_base_low
      }
    }
  };

  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };  

  return (
    <div className="flex flex-col gap-dashboard-spacing-element-medium">
      {quoteContext.selectedModel && 
        <div>
          <div className="text-dashboard-text-description-base title-small uppercase">Votre film : <span className="text-dashboard-text-title-white-high">{quoteContext.selectedModel.title}</span></div>
          <div className="text-dashboard-text-description-base ">Le montage commence le <span className="text-dashboard-text-title-white-high">10/01/2024</span></div>
          <div className="text-dashboard-text-description-base ">Livraison prévu le <span className="text-dashboard-text-title-white-high">15/01/2024</span></div>
        </div>
      }

      <div className="text-title-medium text-dashboard-text-title-white-high">Payer avec</div>

      <hr/>

      {(clientSecret && stripePromise) && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}

      <Input
        type="text"
        label="Code de parainage"
        placeholder="Code de parainage"
        noBg
        size="sm"
      />

      <hr/>

      <div className="flex flex-col">
        <div className="text-title-small text-dashboard-text-description-base">Conditions d’annulation</div>
        <div className="text-base text-dashboard-text-description-base-low">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ac tortor id vulputate. Integer laoreet leo quis ex volutpat, eget feugiat justo lacinia. Nam suscipit, elit eu iaculis feugiat, augue ex vestibulum libero, quis vulputate eros dui nec risus. Sed facilisis,</div>
      </div>

      <hr/>

      <Checkbox
        type="checkbox"
        label={<span>J’accepte que <SimpleLink href={routes.HOME}>Edityour.film</SimpleLink> et <SimpleLink href={'https://stripe.com/fr'}>Stripe</SimpleLink> traitent mes données bancaires à des fins de gestion, tel que défini dans notre <SimpleLink href={routes.PC}>Politique de confidentialité</SimpleLink> et vous acceptez les CGU de <SimpleLink href={routes.CGU}>Edityour.film</SimpleLink> et <SimpleLink href={'https://stripe.com/fr'}>Stripe.</SimpleLink></span>}
        className="text-dashboard-text-description-base"
        // onChange={(val) => { setCGU(val) }}
      />

      <IslandButton
        label="Payer maintenant"
        type="primary"
        id="submit"
        className="w-max self-end"
      />
    </div>
  )
}