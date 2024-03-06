import { typographyVariants, type TypographyProps } from "../variants";

type HeadingSize = "h1" | "h2" | "h3";

interface HeadingProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    Omit<TypographyProps, "variant"> {
  size?: HeadingSize;
  responsive?: boolean;
}

const Heading = ({
  className,
  decoration,
  weight,
  size = "h3",
  ...props
}: HeadingProps) => {
  const variantClass = typographyVariants({
    variant: { h1: "heading1", h2: "heading2", h3: "heading3" }[size] as any,
    weight,
    decoration,
    className,
  });
  switch (size) {
    case "h1":
      return <h1 className={variantClass} {...props} />;
    case "h2":
      return <h2 className={variantClass} {...props} />;
    case "h3":
      return <h3 className={variantClass} {...props} />;
  }
};

export default Heading;
