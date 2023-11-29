type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

function Card({ children, variant = "primary" }: Props) {
  const base = "border py-2 px-3 rounded-[var(--radius)] my-4 w-full";
  const variants = {
    primary: "border bg-primary text-primary-foreground",
    secondary: "border bg-outline text-secondary-foreground shadow-sm",
  };
  return <div className={base + ` ${variants[variant]}`}>{children}</div>;
}

export default Card;
