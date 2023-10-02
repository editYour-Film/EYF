import { useStrapiGet } from "@/hooks/useStrapi";
import { useRouter } from "next/router";
import routes from "@/routes";

export default function Profile() {
  const { push } = useRouter();

  useStrapiGet("users/me?populate=*", true)
    .then((res) => {
      switch (res.data.role.name) {
        case "editor":
          push(routes.DASHBOARD_EDITOR);
          break;
        case "client":
          // push(routes.DASHBOARD_CLIENT)
          break;
      }
    })
    .catch((err) => {
      push(routes.SIGNIN_TYPE);
    });
}
