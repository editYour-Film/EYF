import { useMutation } from "react-query";
import axios from "axios";
import { getTokenFromLocalCookie } from "@/auth/auth";

export const useStrapi = (path: string, populate = true) => {
  const getStrapiData = async () => {
    const { data } = await axios.get<any>(
      process.env.NEXT_PUBLIC_API_STRAPI +
        path +
        (populate ? "?populate=*" : ""),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (path.includes("articles")) {
      if (process.env.NEXT_PUBLIC_ENV === "production")
        return data.data
          .filter((x: any) => x.attributes.production === true)
          .sort((a: any, b: any) =>
            b.attributes.release_date > a.attributes.release_date
              ? 1
              : a.attributes.release_date > b.attributes.release_date
              ? -1
              : 0
          );
      else
        return data.data.sort((a: any, b: any) =>
          b.attributes.release_date > a.attributes.release_date
            ? 1
            : a.attributes.release_date > b.attributes.release_date
            ? -1
            : 0
        );
    }
    if (
      path.includes("page-home") ||
      path.includes("about-me") ||
      path.includes("cgu-client") ||
      path.includes("cgu-mentor") ||
      path.includes("legal-notice") ||
      path.includes("cookies-page") ||
      path.includes("politique-de-confidentialite") ||
      path.includes("newsletter-section")
    ) {
      return data.data.attributes;
    }

    if (path.includes("blog-categories") || path.includes("video-tags"))
      return data.data;

    if (process.env.NEXT_PUBLIC_ENV === "production")
      return data.data.filter((x: any) => x.attributes.production === true);
    else return data.data;
  };

  return useMutation(getStrapiData);
};

export type StrapiResponse = {
  status: number;
  data: any;
};

export const useStrapiPost = async (
  path: string,
  body: any,
  auth: boolean = false,
  isMedia: boolean = false
) => {
  const token = getTokenFromLocalCookie();
  if (auth && !token)
    return {
      status: 400,
      data: "token not set",
    };

  const response: StrapiResponse = await axios
    .post<any>(process.env.NEXT_PUBLIC_API_STRAPI + path, body, {
      headers:
        token && auth
          ? {
              "Content-Type": isMedia
                ? "multipart/form-data"
                : "application/json",
              Authorization: "bearer " + token,
            }
          : { "Content-Type": "application/json" },
    })
    .then((response) => {
      return {
        status: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: 400,
        data: error.response ? error.response.data.error : error,
      };
    });

  return response;
};

export const useStrapiPut = async (
  path: string,
  body: any,
  isMedia: boolean = false
) => {
  const token = getTokenFromLocalCookie();
  if (!token)
    return {
      status: 400,
      data: "token not set",
    };

  const response: StrapiResponse = await axios
    .put<any>(process.env.NEXT_PUBLIC_API_STRAPI + path, body, {
      headers: {
        "Content-Type": isMedia ? "multipart/form-data" : "application/json",
        Authorization: "bearer " + token,
      },
    })
    .then((response) => {
      return {
        status: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: 400,
        data: error.response ? error.response.data.error : error,
      };
    });

  return response;
};

export const useStrapiGet = async (
  path: string,
  auth: boolean = false,
  setHeaders: boolean = true
) => {
  const token = getTokenFromLocalCookie();

  if (auth && !token)
    return {
      status: 400,
      data: "token not set",
    };

  let headers = auth
    ? {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }
    : {
        "Content-Type": "application/json",
      };

  const response: StrapiResponse = await axios
    .get<any>(
      process.env.NEXT_PUBLIC_API_STRAPI + path,
      setHeaders ? { headers } : {}
    )
    .then((response) => {
      return {
        status: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: 400,
        data: error.response ? error.response.data.error : error,
      };
    });

  return response;
};

export const useStrapiDelete = async (
  path: string,
  auth: boolean = false,
  setHeaders: boolean = true
) => {
  const token = getTokenFromLocalCookie();

  if (auth && !token)
    return {
      status: 400,
      data: "token not set",
    };

  let headers = auth
    ? {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }
    : {
        "Content-Type": "application/json",
      };

  const response: StrapiResponse = await axios
    .delete<any>(
      process.env.NEXT_PUBLIC_API_STRAPI + path,
      setHeaders ? { headers } : {}
    )
    .then((response) => {
      return {
        status: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: 400,
        data: error.response ? error.response.data.error : error,
      };
    });

  return response;
};

export default useStrapi;
