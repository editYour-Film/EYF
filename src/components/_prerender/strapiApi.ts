import axios from "axios";

export async function getStrapiData(path: string, populate = true) {
  const { data } = await axios.get<any>(
    process.env.NEXT_PUBLIC_API_STRAPI + path + (populate ? "?populate=*" : ""),
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
  if (path.includes("page-home")) return data.data.attributes;
  if (process.env.NEXT_PUBLIC_ENV === "production")
    return data.data.filter((x: any) => x.attributes.production === true);
  else return data.data;
}
