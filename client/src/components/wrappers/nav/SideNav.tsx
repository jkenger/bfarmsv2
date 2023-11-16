import React from "react";
import NavLinkLists from "./nav-linklists";
import { useNavigation } from "./Navigation";

function SideNav() {
  const { isMenuOpen } = useNavigation();
  return (
    <aside
      className="w-full border-r
md:top-[5.3rem]  md:-ml-2 md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-64 md:pt-0"
    >
      <div className="pl-6 pr-2">
        <NavLinkLists className="hidden md:block my-8 " />
      </div>

      {isMenuOpen && (
        <div
          className={`block md:hidden h-full fixed top-[5em] pt-4 w-full z-30 bg-background`}
        >
          <NavLinkLists className="md:block mb-8 md:px-6 pl-6" />
        </div>
      )}
    </aside>
  );
}

export default SideNav;
