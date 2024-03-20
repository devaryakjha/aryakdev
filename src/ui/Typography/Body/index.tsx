import { typographyVariants, type TypographyProps } from "../variants";

interface BodyProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant"> {}

const Body = ({ className, decoration, weight, ...props }: BodyProps) => {
  const variantClass = typographyVariants({
    variant: "body",
    decoration,
    weight,
    className,
  });
  return <span className={variantClass} {...props} />;
};

export default Body;
