import { css } from "@panda/css";

type Props = JSX.IntrinsicElements["input"];

export default function Input({ type, ...rest }: Props) {
  switch (type) {
    case "text":
      return (
        <input
          {...rest}
          className={css({
            p: 2,
            borderRadius: 4,
            outline: "none",
            w: "100%",
            transition: "all 0.2s ease-in-out",
            _focus: {
              borderColor: "blue.500",
              boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
            },
          })}
        />
      );
    default:
      return <input {...rest} />;
  }
}
