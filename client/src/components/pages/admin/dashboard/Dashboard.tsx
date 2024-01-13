import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BFARLogo from "@/components/ui/logo";
import Main from "@/components/wrappers/Main";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Calendar } from "@/components/ui/calendar";
import StatsContainer from "@/components/ui/stats-container";
import StatsCard from "@/components/ui/StatsCard";
import {
  Building,
  CalendarX,
  CalendarX2,
  Check,
  LogOut,
  User,
} from "lucide-react";
import { IconProperties, Links } from "@/types/common";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { BarRechart } from "@/components/ui/bar-rechart";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const MainContent = (
    <>
      {/* Image */}
      <div className="bg-coral-mobile md:bg-coral-web bg-contain bg-no-repeat   mb-2 h-full relative">
        {/* Container Content */}
        <div className=" pt-48  space-y-2 p-10  h-full  backdrop-blur-[1px]">
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
              <StatsContainer className="grid-cols-1 md:grid-cols-3">
                <StatsCard>
                  <StatsCard.Header>
                    <div className="bg-bfar mr-4">
                      <User className="w-6 h-6" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">
                        Total Employees
                      </span>
                      <span className="font-semibold">20</span>
                    </div>
                  </StatsCard.Header>
                  <StatsCard.Body>
                    <div className="w-full h-[150px] mr-4">
                      <BarRechart />
                    </div>
                  </StatsCard.Body>
                </StatsCard>
                <StatsCard>
                  <StatsCard.Header>
                    <div className="bg-bfar mr-4">
                      <Building className="w-6 h-6" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">In Office</span>
                      <span className="font-semibold">20</span>
                    </div>
                  </StatsCard.Header>
                  <StatsCard.Body>
                    <div className="w-full h-[150px] mr-4">
                      <BarRechart />
                    </div>
                  </StatsCard.Body>
                </StatsCard>

                <StatsCard>
                  <StatsCard.Header>
                    <div className="bg-bfar mr-4">
                      <CalendarX className="w-6 h-6" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Absent</span>
                      <span className="font-semibold">20</span>
                    </div>
                  </StatsCard.Header>
                  <StatsCard.Body>
                    <div className="w-full h-[150px] mr-4">
                      <BarRechart />
                    </div>
                  </StatsCard.Body>
                </StatsCard>
              </StatsContainer>
            </div>
            {/* <div className="bg-card w-1/2  p-2 px-4 border rounded">
              <h1 className="text-md font-medium mb-3 mt-2">
                Recent Attendances
              </h1>
            </div> */}
          </div>
          <StatsContainer>
            <StatsCard>
              <StatsCard.Header>
                <span>Total Employees</span>
                <User size={IconProperties.SIZE_ICON} />
              </StatsCard.Header>
              <StatsCard.Body>
                <div className="w-full">
                  <span>20</span>
                  {/* <BarRechart /> */}
                </div>
              </StatsCard.Body>
            </StatsCard>
            <StatsCard>
              <StatsCard.Header>
                <span>In Office Today</span>
                <Check size={IconProperties.SIZE_ICON} />
              </StatsCard.Header>
              <StatsCard.Body>
                <span>20</span>
              </StatsCard.Body>
            </StatsCard>
            <StatsCard>
              <StatsCard.Header>
                <span>Absent Today</span>
                <CalendarX2 size={IconProperties.SIZE_ICON} />
              </StatsCard.Header>
              <StatsCard.Body>
                <span>20</span>
              </StatsCard.Body>
            </StatsCard>
          </StatsContainer>
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
    <ResizablePanel
      defaultSize={20}
      minSize={15}
      className="
md:top-[5.3rem]   md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col items-center h-full p-6">
        <div className="space-y-2">
          <h1 className="text-sm ml-4">Upcoming holidays</h1>
          <Calendar />
        </div>
      </div>
    </ResizablePanel>
  );

  return (
    <>
      <Main.Content isResizable={!isMobile}>
        {!isMobile ? (
          <>
            <ResizablePanel
              defaultSize={80}
              // maxSize={80}
              className="pt-0 m-0 -mt-3  "
            >
              {MainContent}
            </ResizablePanel>
            <ResizableHandle withHandle />
            {AsideContent}
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
