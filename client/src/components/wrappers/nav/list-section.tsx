import { ChevronLeft } from "lucide-react";

function ListSection({
  title,
  isOpen,
  handleOnClick,
}: {
  title: string;
  isOpen: boolean;
  handleOnClick: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 hover:cursor-pointer"
      onClick={handleOnClick}
    >
      <span>{title}</span>
      <ChevronLeft
        size={16}
        strokeWidth={2}
        className={` duration-300 ease-in-out ${
          isOpen ? "transform -rotate-90" : "transform rotate-0"
        }`}
      />
    </div>
  );
}

export default ListSection;
