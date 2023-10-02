import Button from "@/components/_shared/form/Button";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import routes from "@/routes";

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
      className={`${className} pl-4 md:pl-0 categoriesListW overflow-scroll no-scroll-bar`}
    >
      <div className="categoriesList flex flex-row md:flex-wrap gap-2">
        <div
          className={`categoryTag px-4 py-2 bg-darkgrey w-max h-max rounded-2xl shrink-0 border transition-colors duration-200 hover:bg-background-card`}
          onClick={() => { router.push(routes.BLOG)}}
        >
          À la une
        </div>
        {categories &&
          categories.map((category: any, i:number) => {
            if(category.attributes.category.toLowerCase() !== ('a la une' || 'à la une')) {
              return (
                <CategoryTag
                  key={category.id}
                  name={category.attributes.category}
                  isSelected={selected.includes(category.attributes.category)}
                  onSelected= {(name: any) => {
                    setSelected([name]);
                  }}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

type CategoryTagProps = {
  name: string;
  isSelected: boolean;
  onSelected: Function;
};

const CategoryTag = ({
  name,
  isSelected,
  onSelected,
}: CategoryTagProps) => {
  const selectedStyle = "bg-primary-middle";
  
  return (
    <div
      className={`categoryTag px-4 py-2 bg-darkgrey w-max h-max rounded-2xl shrink-0 transition-colors duration-200 hover:bg-background-card ${
        isSelected && selectedStyle
      }`}
      onClick={() => {
        onSelected(name)
      }}
    >
      {name}
    </div>
  );
};
