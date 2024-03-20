import { typographyVariants, type TypographyProps } from "../variants";

interface SpecialProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    Omit<TypographyProps, "variant" | "weight"> {}

const Special = ({ className, decoration, ...props }: SpecialProps) => {
  return (
    <span
      className={typographyVariants({
        variant: "body",
        decoration,
        weight: "bold",
        className,
      })}
      {...props}
    />
  );
};

export default Special;
