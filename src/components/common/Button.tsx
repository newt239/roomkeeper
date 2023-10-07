import { cva, cx } from "@panda/css";

const buttonStyle = cva({
  base: {
    color: "white",
    py: 2,
    px: 4,
    borderRadius: 4,
    minW: 100,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    _disabled: {
      bgColor: "gray.500",
      _hover: {
        bgColor: "gray.500",
      },
      opacity: 0.5,
    },
  },
  variants: {
    type: {
      default: {
        bgColor: "blue.500",
        _hover: {
          bgColor: "blue.600",
        },
        _focus: {
          borderColor: "blue.500",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        },
      },
      danger: {
        bgColor: "red.500",
        _hover: {
          bgColor: "red.700",
        },
        _focus: {
          borderColor: "red.500",
          boxShadow: "0 0 0 3px rgba(245, 101, 101, 0.6)",
        },
      },
    },
  },
});

type Props = JSX.IntrinsicElements["button"] & {
  variant?: "default" | "danger";
};

export default function Button({
  children,
  className,
  variant = "default",
  ...rest
}: Props) {
  return (
    <button {...rest} className={cx(buttonStyle({ type: variant }), className)}>
      {children}
    </button>
  );
}
