import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BFARLogo from "@/components/ui/logo";
import Main from "@/components/wrappers/Main";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Calendar } from "@/components/ui/calendar";
import StatsContainer from "@/components/ui/stats-container";

import { LogOut } from "lucide-react";
import { IconProperties, Links } from "@/types/common";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import AttendanceInfoCard from "@/components/ui/attendance-info-card";
import OverallInfoCard from "@/components/ui/overall-info-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 1180px)");

  const MainContent = (
    <>
      {/* Image */}
      <div className="bg-coral-mobile md:bg-coral-web bg-contain bg-no-repeat mb-2 h-full relative">
        {/* Container Content */}
        <div className=" lg:pt-48  space-y-2 lg:p-10  h-full  backdrop-blur-[1px]">
          {/* Header */}
          <div className="flex gap-4 items-center text-xs">
            <div className=" rounded-full border inline-flex justify-start items-center gap-2 px-2 py-1 bg-card">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <BFARLogo />
                </AvatarFallback>
                <AvatarImage src=""></AvatarImage>
              </Avatar>
              <span className="font-medium">Ken gervacio</span>
            </div>
            <Link
              to={Links.ADMIN_LOGIN}
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "gap-2",
              })}
            >
              <LogOut size={IconProperties.SIZE} />
              <span>Log out</span>
            </Link>
          </div>
          <h1 className="text-lg font-semibold">Welcome, Ken Gervacio</h1>
          {/* Content */}
          <div className="mt-2 flex gap-2">
            <div className="bg-card w-full p-2 px-4 border rounded">
              <h1 className="text-md font-semibold mb-3 mt-2">Overall Stats</h1>
              <StatsContainer className="grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                <OverallInfoCard data={["a"]} />
                <OverallInfoCard data={["a"]} />
                <OverallInfoCard data={["a"]} />
              </StatsContainer>
            </div>
            {/* <div className="bg-card w-1/2  p-2 px-4 border rounded">
              <h1 className="text-md font-medium mb-3 mt-2">
                Recent Attendances
              </h1>
            </div> */}
          </div>
          <div className="mt-2 flex gap-4">
            <div className="bg-card w-full py-4 px-4 border rounded">
              <h1 className="text-md font-semibold mb-3 ">
                Recent Attendances
              </h1>
              <StatsContainer className="hover:cursor-grab active:cursor-grabbing mb-2">
                <Carousel className="w-full ">
                  <CarouselContent className=" max-w-sm md:max-w-md lg:max-w-lg">
                    <CarouselItem className="pl-1 ">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                    <CarouselItem className="pl-1">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                    <CarouselItem className="pl-1 ">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                    <CarouselItem className="pl-1 ">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                    <CarouselItem className="pl-1 ">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                    <CarouselItem className="pl-1 ">
                      <AttendanceInfoCard data={["asd"]} />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </StatsContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // const MainContent = (
  //   <div className="flex w-full max-w-[1200px] flex-col-reverse gap-4 p-0 md:flex-row md:p-4">
  //     {/* eto yung div para sa content nung blog */}
  //     <div className="flex w-full flex-col gap-4">
  //       <img
  //         src={"https://picsum.photos/seed/picsum/200/300"}
  //         alt="thumbnail"
  //         className="h-[200px] w-full rounded-2xl object-cover px-[20px] md:h-[400px]"
  //       />

  //       <div className="w-full max-w-[900px]">
  //         <div className="flex flex-col gap-4 px-[20px]">
  //           <div>
  //             <h1 className="text-[2rem] font-bold md:text-[2.5rem]">TITLE</h1>
  //             <p className="text-sm text-navTextColor">SUBTITLE</p>
  //           </div>
  //           <div className="flex gap-2">DESCRIPT</div>
  //         </div>
  //         CONTANTE
  //       </div>
  //     </div>

  //     {/* eto yung sa right side */}
  //     <div
  //       className="flex h-[150px]
  //   w-full max-w-[450px] flex-col justify-between rounded-2xl
  //   border border-borderColor p-4 md:sticky md:top-[5.5rem]"
  //     >
  //       THIS IS THE RIGGHT SIDE
  //     </div>
  //   </div>
  // );

  const AsideContent = isMobile ? (
    <aside
      className="
md:top-[5.3rem]   md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col items-center h-full p-6">
        <div className="space-y-2">
          <h1 className="text-sm ml-4">Upcoming holidays</h1>
          <Calendar />
        </div>
      </div>
    </aside>
  ) : (
    <div className="flex flex-col items-center h-full p-6">
      <div className="space-y-2">
        <h1 className="text-sm ml-4">Upcoming holidays</h1>
        <Calendar />
      </div>
    </div>
  );

  return (
    <>
      <Main.Content isResizable={!isMobile}>
        {!isMobile ? (
          <>
            <ResizablePanel defaultSize={80} className="pt-0 m-0 -mt-3  ">
              {MainContent}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={20}
              minSize={15}
              className="
              md:top-[5.3rem]   md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col justify-center items-center"
            >
              {AsideContent}
            </ResizablePanel>
          </>
        ) : (
          <>
            {MainContent}
            {AsideContent}
          </>
        )}
      </Main.Content>
    </>
  );
}

export default Dashboard;
