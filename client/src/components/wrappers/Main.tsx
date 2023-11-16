import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow md:h-full rounded-lg  mx-6 mt-6 md:mx-0 md:ml-4 ">
      {children}
    </main>
  );
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
      <div className="flex items-center justify-between w-full md:pt-0 lg:mb-0 lg:w-auto">
        <h1 className="text-md font-semibold tracking-wide py-2">{title}</h1>
        <div>{mobileButton}</div>
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
  return <div className="mt-4 px-6 py-4 ">{children}</div>;
}

Main.Header = Header;
Main.Heading = Heading;
Main.Content = Content;

export default Main;
