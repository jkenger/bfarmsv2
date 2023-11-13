import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex flex-col items-start lg:flex-row lg:items-center justify-between px-6 py-4 border-b ">
      {children}
    </header>
  );
}

function Heading({
  title,
  mobileButton,
  children,
}: {
  title: string;
  children?: React.ReactNode;
  mobileButton?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between w-full lg:mb-0 lg:w-auto">
        <h1 className="text-2xl font-semibold ">{title}</h1>
        {mobileButton}
      </div>
      <div
        className={`${
          React.Children.count(children) > 0 && "mt-2"
        } flex flex-col lg:flex-row gap-2 w-full lg:w-auto`}
      >
        {children}
      </div>
    </>
  );
}

Main.Header = Header;
Main.Heading = Heading;

export default Main;
