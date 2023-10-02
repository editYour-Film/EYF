export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={"px-5 md:px-0 max-w-6xl mx-auto relative " + className}>
      {children}
    </div>
  );
};

export const ContainerSm: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={"px-5 md:px-0 mx-auto w-full sm:w-[360px] relative " + className}>
      {children}
    </div>
  );
};

export const ContainerFullWidth: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return <div className={"md:px-0 relative " + className}>{children}</div>;
};

export const ContainerFull: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return <div className={"relative " + className}>{children}</div>;
};

export default Container;
