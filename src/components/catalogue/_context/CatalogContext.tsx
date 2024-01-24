import { useStrapiGet } from "@/hooks/useStrapi"
import { fakeDelay } from "@/utils/FakeDalay"
import { PropsWithChildren, createContext, useEffect, useState } from "react"

interface filtersInterface {
  label: string;
  value: string | number;
}

interface searchValuesInterface {
  label: string;
  id: number
}

export type CatalogContextType = {
  models: {keyword: string, models: any}[],

  detailModel: any,
  setDetailModel: (model: any) => void,

  showMorePanel: boolean,
  setShowMorePanel: (val: boolean) => void,

  openDetailPanel: boolean,
  setOpenDetailPanel: (val: boolean) => void,

  isFetching: boolean,
  fetchMore: () => void,
  
  moreModels: any[],
  fetchMoreModels: (payload: string, nextPage: boolean) => void,

  filters: filtersInterface[],
  setFilters: (filters: filtersInterface[]) => void,

  searchValues: searchValuesInterface[],
  setSearchValues: (searchValues: searchValuesInterface[]) => void,
}

const defaultContext:CatalogContextType = {
  models: [] as CatalogContextType['models'],

  detailModel: undefined,
  setDetailModel: (model) => {},

  showMorePanel: false,
  setShowMorePanel: (bool) => {},

  openDetailPanel: false,
  setOpenDetailPanel: (bool) => {},

  isFetching: false,
  fetchMore: () => {},

  moreModels: [],
  fetchMoreModels: (keyword, nextPage) => {},

  filters: [],
  setFilters: (filters: CatalogContextType['filters']) => {},

  searchValues: [] as CatalogContextType['searchValues'],
  setSearchValues: (values) => {}
}

export const CatalogContext = createContext(defaultContext)

export const CatalogContextProvider = ({children}: PropsWithChildren) => {
  const defaultFilters:CatalogContextType['filters'] = [
    {
      label: 'Disponible dès demain',
      value: 'availiable'
    },
    {
      label: 'Carré',
      value: 'square'
    },
    {
      label: '16/9ème',
      value: '16/9'    
    }, 
    {
      label: 'Horizontal',
      value: 'horizontal'
    }
  ]

  const [detailModel, setDetailModel] = useState<CatalogContextType['detailModel']>(undefined)
  const [showMorePanel, setShowMorePanel] = useState<CatalogContextType['showMorePanel']>(false)
  const [openDetailPanel, setOpenDetailPanel] = useState<CatalogContextType['openDetailPanel']>(false)
  
  const [isFetching, setIsFetching] = useState(false)

  const [models, setModels] = useState<CatalogContextType['models']>([])
  const [moreModels, setMoreModels] = useState<CatalogContextType['moreModels']>([])

  const [filters, setFilters] = useState<CatalogContextType['filters']>(defaultFilters)
  const [searchValues, setSearchValues] = useState<CatalogContextType['searchValues']>([])

  useEffect(() => {
    // TODO: Integration get the models by keyword
    fetch()
    getAllsearchVal()
  }, [])

  const fetch = async () => {
    // get the videos
    setIsFetching(true)
    await fakeDelay(1000)

    const testVid2 = await useStrapiGet(
      'editor-videos/473' +
      '?populate=*'
    )

    const testVid3 = await useStrapiGet(
      'editor-videos/468' +
      '?populate=*'
    )

    const testVid4 = await useStrapiGet(
      'editor-videos/474' +
      '?populate=*'
    )

    setModels([{
      keyword: 'Youtube',
      models: [testVid2.data.data.attributes, testVid3.data.data.attributes, testVid4.data.data.attributes]
    }])
    
    setIsFetching(false)
  }

  const fetchMore = async () => {
    // get more of the current screen
    setIsFetching(true)
    await fakeDelay(2000)

    const testVid3 = await useStrapiGet(
      'editor-videos/468' +
      '?populate=*'
    )
    
    setModels([...models, {
      keyword: 'More Tag1',
      models: [testVid3.data.data.attributes, testVid3.data.data.attributes, testVid3.data.data.attributes]
    }, {
      keyword: 'More Tag2',
      models: [testVid3.data.data.attributes, testVid3.data.data.attributes, testVid3.data.data.attributes]
    }, {
      keyword: 'More Tag3',
      models: [testVid3.data.data.attributes, testVid3.data.data.attributes, testVid3.data.data.attributes]
    }])
    setIsFetching(false)
  }

  const fetchMoreModels = async (keyword: any, nextPage = false) => {
    //TODO: integration get more models based on the given keyword
    setIsFetching(true)
    await fakeDelay(1000)

    const testVid2 = await useStrapiGet(
      'editor-videos/473' +
      '?populate=*'
    )

    const testVid3 = await useStrapiGet(
      'editor-videos/468' +
      '?populate=*'
    )

    const testVid4 = await useStrapiGet(
      'editor-videos/474' +
      '?populate=*'
    )

    if(nextPage) {
      setMoreModels([...moreModels,
        testVid2.data.data.attributes, 
        testVid2.data.data.attributes, 
        testVid3.data.data.attributes,
        testVid4.data.data.attributes, 
        testVid4.data.data.attributes, 
        testVid2.data.data.attributes,
        testVid3.data.data.attributes, 
        testVid4.data.data.attributes, 
        testVid3.data.data.attributes
      ])
    } else {
      setMoreModels([
        testVid2.data.data.attributes, 
        testVid2.data.data.attributes, 
        testVid3.data.data.attributes,
        testVid4.data.data.attributes, 
        testVid4.data.data.attributes, 
        testVid2.data.data.attributes,
        testVid3.data.data.attributes, 
        testVid4.data.data.attributes, 
        testVid3.data.data.attributes
      ])
    }

    setIsFetching(false)
  }

  const getAllsearchVal = async () => {
    // TODO: Integration get all possible values of keyword, or editor to perform search based on them
    // I propose an array of object like {label: string, id: number}
    // label = username or tag name
    // id = strapi object id
    await fakeDelay(2000)

    setSearchValues([
      {label: 'Voyage', id: 1},
      {label: 'Video', id: 10},
      {label: 'Cuisine', id: 2},
      {label: 'Sport', id: 3},
      {label: 'Nature', id: 4},
      {label: 'Expérience', id: 5},
      {label: 'Professionel', id: 6},
      {label: 'Jardin', id: 7},
    ])
  }

  const filter = () => {
    // get the params of the filters and return the new values
  }

  return (
    <CatalogContext.Provider
      value={{
        models,
        detailModel,
        setDetailModel,

        filters,
        setFilters,

        searchValues,
        setSearchValues,

        showMorePanel,
        setShowMorePanel,

        openDetailPanel,
        setOpenDetailPanel,

        isFetching,
        fetchMore,

        moreModels,
        fetchMoreModels,
      }}
    >
      {children}
    </CatalogContext.Provider>
  )
}