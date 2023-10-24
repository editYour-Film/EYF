import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import Button from "./form/Button";
import { useRouter } from "next/router";

type headerProps = {
  previousPath?: string;
};
const Header = ({ previousPath }: headerProps) => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <ContainerFullWidth className="md:px-10">
        <div className="flex items-center flex-wrap px-4 py-2 md:py-5 justify-end">
          <Link href={routes.HOME}>
            <Button
              text="Fermer"
              variant="black"
              className=""
              onClick={() => {
                router.push(previousPath ? previousPath : routes.HOME);
              }}
            />
          </Link>
        </div>
      </ContainerFullWidth>
    </header>
  );
};

export default Header;
