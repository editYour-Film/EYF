import { PropsWithChildren, createContext } from "react";

export const AgendaContext = createContext({

})

export const AgendaContextProvider = ({children}:PropsWithChildren) => {
  return (
    <AgendaContext.Provider
      value={{
        
      }}
    >
      {children}
    </AgendaContext.Provider>
  )
}