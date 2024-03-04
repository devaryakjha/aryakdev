import Typography from "@/ui/Typography";
import styles from "./Button.module.css";
import { type VariantProps, cva } from "class-variance-authority";

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

const Button = ({ variant, children, ...props }: ButtonProps) => {
  const className = buttonVariants(variant);
  return (
    <button className={className} {...props}>
      <Typography.Body>{children}</Typography.Body>
    </button>
  );
};

export default Button;
