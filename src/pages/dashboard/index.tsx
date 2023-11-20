import { useRouter } from "next/router";
import routes from "@/routes";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";

export default function Profile() {
  const autContext = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    if(autContext.user.user.role.type === 'editor') push(routes.DASHBOARD_EDITOR);
    else if(autContext.user.user.role.type === 'client') push(routes.DASHBOARD_CLIENT);
  }, []);
}
