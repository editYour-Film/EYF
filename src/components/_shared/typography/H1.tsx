import { TypographyProps } from "./H3";

export const H1: React.FC<TypographyProps> = ({
  children,
  className = "",
  id = "",
  fake = false,
  style
}) => {
  return (
    !fake ?
      <h1 className={"n27 uppercase " + className} id={id} style={style}>
        {children}
      </h1>
    :
      <div className={"n27 uppercase " + className} id={id} style={style}>
        {children}
      </div>
  );
};
