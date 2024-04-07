import logo from "../../assets/bfarlogo.png";

export const logo_url = logo;

function BFARLogo({ cn }: { cn?: string }) {
  return <img src={logo_url} alt="BFAR Logo" className={cn} />;
}

export default BFARLogo;
