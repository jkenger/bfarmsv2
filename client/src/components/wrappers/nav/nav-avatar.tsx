import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

function NavAvatar() {
  return (
    <div className="md:border-0 px-6 md:px-0 hover:cursor-pointer">
      <div className="flex items-center gap-4 py-4">
        <Avatar className="w-7 h-7 ">
          <AvatarImage src="https://i.pravatar.cc/160?img=11" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default NavAvatar;
