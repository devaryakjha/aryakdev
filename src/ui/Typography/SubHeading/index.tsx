import { typographyVariants, type TypographyProps } from "../variants";

interface SubHeadingProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant"> {}

const SubHeading = ({
  className,
  decoration,
  weight,
  ...props
}: SubHeadingProps) => {
  const variantClass = typographyVariants({
    variant: "subheading",
    weight,
    decoration,
    className,
  });
  return <span className={variantClass} {...props} />;
};

export default SubHeading;
