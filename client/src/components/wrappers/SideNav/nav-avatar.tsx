import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

function NavAvatar() {
  return (
    <div className="hidden md:block border-t px-6">
      <div className="flex items-center gap-2 py-4">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide">John Doe</span>
          <span className="text-muted-foreground text-xs">Super Admin</span>
        </div>
      </div>
    </div>
  );
}

export default NavAvatar;
