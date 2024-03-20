import { typographyVariants, type TypographyProps } from "../variants";

interface LabelProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant"> {}

const Label = ({ className, decoration, weight, ...props }: LabelProps) => {
  return (
    <span
      className={typographyVariants({
        variant: "label",
        decoration,
        weight,
        className,
      })}
      {...props}
    />
  );
};

export default Label;
