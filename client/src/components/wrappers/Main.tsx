import React from "react";
import { Badge } from "../ui/badge";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow md:h-full rounded-lg md:mx-0">{children}</main>
  );
}

function BreadCrumbs({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex flex-col items-start lg:flex-row lg:items-center justify-between px-6 py-4 border-b md:px-10">
      {children}
    </header>
  );
}

function Heading({
  title,
  mobileButton,
  children,
  access,
}: {
  title: string;
  children?: React.ReactNode;
  mobileButton?: React.ReactNode;
  access?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between w-full md:pt-0 lg:mb-0 lg:w-auto">
        <div className="flex gap-2 items-center">
          <h1 className="text-md font-semibold tracking-wide py-2">{title}</h1>
          {access && <Badge variant="outline">{access}</Badge>}
        </div>

        <div className="lg:hidden">{mobileButton}</div>
      </div>
      <div
        className={`${
          React.Children.count(children) > 0 && "mt-2 lg:mt-0"
        } flex flex-col lg:flex-row gap-2 w-full lg:w-auto`}
      >
        {children}
      </div>
    </>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 px-6 py-4 md:px-10 ">{children}</div>;
}

Main.BreadCrumbs = BreadCrumbs;
Main.Header = Header;
Main.Heading = Heading;
Main.Content = Content;

export default Main;
