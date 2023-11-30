import { PropsWithChildren } from "react";
import { createContext } from "react";

export const GlobalContext = createContext({
  sendSponsorLink: (email: string) => {},
})

export const GlobalContextProvider = ({children}:PropsWithChildren) => {
  const sendSponsorLink = (email: string) => {
    console.log('sendSupport Link');
    
    // TODO: Integration do the logic of the sponsor friend feature
  }

  return (
    <GlobalContext.Provider
      value={{
        sendSponsorLink
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}