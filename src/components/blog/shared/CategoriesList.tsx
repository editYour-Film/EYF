import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import routes from "@/routes";
import { Keyword } from "@/components/_shared/UI/Keyword";

type CategoriesListProps = {
  categories: any;
  current?: any;
  onChange: Function;
  className?: string;
};

export const CategoriesList = ({
  categories,
  current,
  onChange,
  className,
}: CategoriesListProps) => {
  const [selected, setSelected] = useState<any>(current);
  
  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const router = useRouter()  
  
  return (
    <div
      className={`${className} categoriesListW p-[3px] overflow-scroll no-scroll-bar`}
    >
      <div className="categoriesList flex flex-row md:flex-wrap gap-2">
        <Keyword 
          text={'À la une'}
          onClick={() => {router.push(routes.BLOG)}}
          selected={window.location.pathname === routes.BLOG}
          noCross
          height
          className="w-max"
        />
        {categories &&
          categories.map((category: any, i:number) => {
            const name = category.attributes.category
            if(name.toLowerCase() !== ('a la une' || 'à la une')) {
              return (
                <Keyword 
                  key={category.id}
                  text={name}
                  onClick={() => { setSelected([name]); }}
                  selected={selected.includes(name)}
                  noCross
                  height
                  className="w-max"
                />
              );
            }
          })}
      </div>
    </div>
  );
};
