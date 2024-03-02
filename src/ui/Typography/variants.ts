import styles from "./Typography.module.css";
import { VariantProps, cva } from "class-variance-authority";

export const typographyVariants = cva(styles.base, {
  variants: {
    variant: {
      special: styles.special,
      body: styles.body,
      heading1: styles.heading1,
      heading2: styles.heading2,
      heading3: styles.heading3,
      subheading: styles.subheading,
      caption: styles.caption,
      label: styles.label,
    },
    weight: {
      regular: styles.regular,
      medium: styles.medium,
      bold: styles.bold,
    },
    decoration: {
      underline: styles.underline,
      italic: styles.italic,
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "regular",
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {}
