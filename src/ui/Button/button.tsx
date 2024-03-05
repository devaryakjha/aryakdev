import styles from "./Button.module.css";
import { type VariantProps, cva } from "class-variance-authority";
import { typographyVariants } from "@ui/Typography/variants";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      navigation: styles.navigation,
      icon: styles.icon,
    },
  },
});

type ButtonProps = {
  variant: VariantProps<typeof buttonVariants>;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ variant, children, className, ...props }: ButtonProps) => {
  const computedClass = typographyVariants({
    variant: "body",
    className: buttonVariants({ ...variant, className }),
  });
  return (
    <button className={computedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
