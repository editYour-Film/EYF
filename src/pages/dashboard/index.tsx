import { useRouter } from "next/router";
import routes from "@/routes";
import { useEffect } from "react";

export default function Profile() {
  const { push } = useRouter();
  useEffect(() => {
    push(routes.DASHBOARD_EDITOR);
  }, []);
}
