import { FC } from "react";

import { cn } from "@/lib/utils";

type InfoCardProps = {
  label: string;
  value: string | number;
  variant?: "default" | "primary";
};

export const InfoCard: FC<InfoCardProps> = ({
  label,
  value,
  variant = "default",
}) => {
  if (typeof value === "number") {
    value = value.toLocaleString();
  }

  return (
    <div
      className={cn(
        "flex flex-1 shrink-0 flex-col items-center justify-center rounded-lg bg-accent p-3 text-center",
        {
          "bg-primary text-white": variant === "primary",
        }
      )}
    >
      <span className="font-bold">{value}</span>
      <span
        className={cn("text-xs text-muted-foreground", {
          "text-zinc-100": variant === "primary",
        })}
      >
        {label}
      </span>
    </div>
  );
};
