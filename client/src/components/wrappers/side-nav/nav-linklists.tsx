import Lists from "./lists";

type Props = {
  className?: string;
};

function NavLinkLists({ className }: Props) {
  return (
    <div className={className}>
      <ul
        className="flex flex-col gap-4 mt-4 text-xs font-semibold 
      tracking-wide  h-[75vh] overflow-auto md:overflow-scroll "
      >
        <Lists />
      </ul>
    </div>
  );
}

export default NavLinkLists;
