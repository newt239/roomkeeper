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
            my: 2,
            borderBottomStyle: "solid",
            borderBottomWidth: 2,
            borderBottomColor: "gray.800",
          })}
        >
          {children}
        </h3>
      );
    case "h4":
      return <h4>{children}</h4>;
  }
}
