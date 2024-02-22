import { ClassicContent } from "@/components/_shared/UI/ClassicContent";
import routes from "@/routes";
import { TeamCard } from "./TeamCard";

export const Team = ({ data }: any) => {
  return (
    <div className="team bg-dashboard-background-content-area px-[20px] lg:px-[64px] xl:px-[164px] py-[64px] border rounded-t-dashboard-medium-radius">
      <ClassicContent
        className="max-w-[660px]"
        suptitle="notre équipe"
        suptitleClassName="text-linear-sunset"
        title="Il s'agit avant tout des personnes"
        titleType="h2"
        titleClassName="text-title-medium"
        paragraph="Nous sommes toujours à la recherche de personnes exceptionnelles pour nous rejoindre. Si vous êtes intéressé(e) à construire l'avenir de la collaboration avec nous, consultez nos postes disponibles ci-dessous."
        cta="Voir les recrutements en cours"
        ctaType="primary"
        ctaHref={routes.BLOG}
        gap="padding-medium"
      />

      <div className="team__members-w grid grid-cols-6 gap-padding-medium mt-dashboard-spacing-element-medium lg:mt-[64px]">
        {data.team_members &&
          data.team_members.map((member: any, i: number) => {
            return (
              <TeamCard
                key={i}
                name={member.name}
                position={member.position}
                img={member.img.data[0]}
                links={member.links}
                className={`col-span-6 md:col-span-3 ${
                  i < 2 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              />
            );
          })}
      </div>
    </div>
  );
};
