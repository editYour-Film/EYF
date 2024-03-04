import qs from 'qs'
import axios from "axios";

const seoQueryString = qs.stringify(
  {
    populate: ["seo", "seo.metaSocial.image"],
  },
  {
    encodeValuesOnly: true,
  }
);

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STRAPI,
  headers: {
    "Content-Type": "application/json",
  },
})

export const useGetSeoData = async (page:string) => {
  const path = `${page}?${seoQueryString}`
  
  try {
    const { data } = await client.get(path)
    return data.data.attributes.seo
  } catch (error) {
    console.log(error);
    return null
  } 
}

export const useGetSeoDataFiltered = async (endpoint:string, filter:string) => {
  const path = `${endpoint}?${filter}&${seoQueryString}`
  
  try {
    const { data } = await client.get(path)
    return data.data.attributes.seo
  } catch (error) {
    console.log(error);
    return null
  } 
}