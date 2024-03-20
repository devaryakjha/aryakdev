import { typographyVariants, type TypographyProps } from "../variants";

interface CaptionProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant"> {}

const Caption = ({ className, decoration, weight, ...props }: CaptionProps) => {
  return (
    <span
      className={typographyVariants({
        variant: "caption",
        decoration,
        weight,
        className,
      })}
      {...props}
    />
  );
};

export default Caption;
