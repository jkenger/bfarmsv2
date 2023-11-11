import logo from "../../assets/bfarlogo.png";

function BFARLogo({ cn }: { cn?: string }) {
  return <img src={logo} alt="BFAR Logo" className={cn} />;
}

export default BFARLogo;
