import { typographyVariants, type TypographyProps } from "../variants";

interface BodyProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant"> {}

const Body = ({ className, decoration, weight, ...props }: BodyProps) => {
  return (
    <span
      className={typographyVariants({
        variant: "body",
        decoration,
        weight,
        className,
      })}
      {...props}
    />
  );
};

export default Body;
