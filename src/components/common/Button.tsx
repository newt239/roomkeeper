import { css, cx } from "@panda/css";

type Props = JSX.IntrinsicElements["button"];

export default function Button({ children, className, ...rest }: Props) {
  const rootClassName = css({
    p: 2,
    borderRadius: 4,
    w: "25%",
    minW: 100,
    cursor: "pointer",
    bgColor: "blue.500",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bgColor: "blue.600",
    },
    _focus: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    _disabled: {
      bgColor: "gray.300",
      cursor: "not-allowed",
      _hover: {
        bgColor: "gray.300",
      },
      _osDark: {
        bgColor: "gray.700",
        _hover: {
          bgColor: "gray.700",
        },
      },
    },
  });
  return (
    <button {...rest} className={cx(rootClassName, className)}>
      {children}
    </button>
  );
}
