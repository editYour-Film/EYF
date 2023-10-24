import { useStrapiGet } from "@/hooks/useStrapi";
import { useRouter } from "next/router";
import routes from "@/routes";
import { use, useEffect } from "react";

export default function Profile() {
  const { push } = useRouter();
  useEffect(() => {
    push(routes.DASHBOARD_EDITOR);
  }, []);
}
