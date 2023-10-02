export type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  textSize?: string;
  id?: string;
  fake?: boolean;
  style?: any
};
export const H3: React.FC<TypographyProps> = ({
  children,
  textSize = " text-xl md:text-2xl",
  className = "",
  fake = false,
  style
}) => {
  return !fake ? <h3 className={"font-bold " + className + textSize} style={style}>{children}</h3> : <div className={"font-bold " + className + textSize} style={style}>{children}</div>
};
