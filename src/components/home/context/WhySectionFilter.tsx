import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useContext } from "react";

const storageKey = "why_section_filter";

interface initialWhySectionFilterType {
  filter: string;
}

export const initialWhySectionFilter = {
  filter: "creator",
};

export const WhySectionFilterContext = createContext<
  [
    initialWhySectionFilterType,
    (
      value:
        | initialWhySectionFilterType
        | ((val: initialWhySectionFilterType) => initialWhySectionFilterType)
    ) => void
  ]
>([initialWhySectionFilter, () => {}]);

const WhySectionFilterProvider: React.FC<any> = ({ children }) => {
  const [whySectionFilter, setWhySectionFilter] =
    useLocalStorage<initialWhySectionFilterType>(
      storageKey,
      initialWhySectionFilter
    );

  return (
    <WhySectionFilterContext.Provider
      value={[whySectionFilter, setWhySectionFilter]}
    >
      {children}
    </WhySectionFilterContext.Provider>
  );
};

export const useWhySectionFilter = () => useContext(WhySectionFilterContext);

export default WhySectionFilterProvider;
