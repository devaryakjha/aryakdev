"use client";
import { useTheme } from "@/hooks/useTheme";
import { type ImageProps, getImageProps } from "next/image";

interface ThemedImageProps extends Omit<ImageProps, "src"> {
  lightSrc: string;
  darkSrc: string;
}

/**
 * A component that renders an image with different sources for light and dark mode.
 * @param lightSrc The source of the image to be used in light mode.
 * @param darkSrc The source of the image to be used in dark mode.
 * @param alt The alt text for the image.
 * @param rest The rest of the props are passed to the `img` element.
 */
export default function ThemedImage({
  lightSrc,
  darkSrc,
  ...common
}: ThemedImageProps) {
  const { theme } = useTheme();
  const {
    props: { src: dark },
  } = getImageProps({ ...common, src: darkSrc });
  const {
    props: { src: light, ...rest },
  } = getImageProps({ ...common, src: lightSrc });

  return (
    <picture>
      <source srcSet={theme === "dark" ? dark : light} />
      <img alt={common.alt} {...rest} />
    </picture>
  );
}
