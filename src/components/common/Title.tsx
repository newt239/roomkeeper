import { css } from "@panda/css";

type Props = {
  level: "h2" | "h3" | "h4";
  children: React.ReactNode;
};

export default function Title({ level, children }: Props) {
  switch (level) {
    case "h2":
      return (
        <h2
          className={css({
            fontSize: "4xl",
            fontWeight: 700,
            mt: 4,
            mb: 2,
          })}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={css({
            fontSize: "2xl",
            mt: 4,
            mb: 2,
            borderBottomStyle: "solid",
            borderBottomWidth: 2,
            borderBottomColor: "gray.800",
          })}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={css({
            fontSize: "xl",
            fontWeight: 700,
            mt: 4,
            mb: 2,
            pl: 2,
            borderLeftStyle: "solid",
            borderLeftWidth: 8,
            borderLeftColor: "gray.800",
            _osDark: {
              borderLeftColor: "gray.200",
            },
          })}
        >
          {children}
        </h4>
      );
  }
}
