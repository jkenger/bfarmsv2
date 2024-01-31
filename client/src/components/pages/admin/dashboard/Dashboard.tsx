import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BFARLogo from "@/components/ui/logo";
import Main from "@/components/wrappers/Main";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Calendar } from "@/components/ui/calendar";
import StatsContainer from "@/components/ui/stats-container";

import {
  ArrowUpLeftFromCircle,
  BarChart,
  CalendarDays,
  CalendarOff,
  LogOut,
  SquareStack,
} from "lucide-react";
import { GetQueryType, IconProperties, Links } from "@/types/common";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { Link, defer, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import AttendanceInfoCard from "@/components/ui/attendance-info-card";
import OverallInfoCard from "@/components/ui/overall-info-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import IsEmptyContent from "@/components/ui/isempty-content";
import { getDashboard } from "./api/dashboard.api";
import { QueryClient, useQuery } from "@tanstack/react-query";
// import { addDays, startOfMonth } from "date-fns";
import StatsCard from "@/components/ui/StatsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getDashboard({ type: GetQueryType.ALL })),
  });
};

function Dashboard() {
  const { data, isPending } = useQuery(
    getDashboard({ type: GetQueryType.ALL })
  );
  const attendance = data?.overallStats?.attendance;
  const ranking = data?.overallStats?.ranking;
  const recentAttendances = data?.overallStats?.recentAttendances;
  const isMobile = useMediaQuery("(max-width: 1180px)");
  const navigate = useNavigate();
  // const startDate = startOfMonth(new Date());
  // const endDate = addDays(startOfMonth(new Date()), 14);

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
              <h1 className="text-md font-semibold mb-3 mt-2">Payroll Stats</h1>
              <StatsContainer className="flex">
                {isPending ? (
                  <Skeleton className="w-[200px] h-[75px]" />
                ) : (
                  <>
                    <StatsCard>
                      <StatsCard.Header>
                        <div className="bg-bfar mr-4">
                          <SquareStack size={18} strokeWidth={1} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            Payroll Groups
                          </span>
                          <span className="font-semibold ">Total: 5</span>
                        </div>
                      </StatsCard.Header>
                    </StatsCard>
                    <StatsCard>
                      <StatsCard.Header>
                        <div className="bg-bfar mr-4">
                          <ArrowUpLeftFromCircle size={18} strokeWidth={1} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            Quick Actions
                          </span>
                        </div>
                      </StatsCard.Header>
                      <StatsCard.Body className="mb-4">
                        <div className="w-full mr-4 px-4 space-y-1">
                          <Button size="sm" className="w-full">
                            Generate Payroll
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Create Payroll Group
                          </Button>
                        </div>
                      </StatsCard.Body>
                    </StatsCard>
                    {/* <OverallInfoCard
                      total={data.overallStats.attendance.total}
                      data={data.overallStats.attendance.data}
                      label={`Total Attendances for ${startOfMonth(
                        new Date()
                      ).toLocaleDateString()} - ${addDays(
                        startOfMonth(new Date()),
                        14
                      ).toLocaleDateString()}`}
                      keys={{
                        Y: "day",
                        X: "total",
                      }}
                    /> */}
                  </>
                )}
                {/* <OverallInfoCard data={["a"]} />
                <OverallInfoCard data={["a"]} /> */}
              </StatsContainer>
            </div>
            {/* <div className="bg-card w-1/2  p-2 px-4 border rounded">
              <h1 className="text-md font-medium mb-3 mt-2">
                Recent Attendances
              </h1>
            </div> */}
          </div>
          <div className="mt-2 flex gap-2">
            <div className="bg-card w-full p-2 px-4 border rounded">
              <h1 className="text-md font-semibold mb-3 mt-2">Overall Stats</h1>
              <StatsContainer className="grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {isPending ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <OverallInfoCard
                      type="Total Attendances"
                      icon={
                        <CalendarDays className="w-6 h-6" strokeWidth={1} />
                      }
                      total={attendance.total}
                      data={attendance.data}
                      label={` Overview from ${format(
                        new Date(attendance.dateRange.from),
                        "MM/dd/yyyy"
                      )} - ${format(
                        new Date(attendance.dateRange.to),
                        "MM/dd/yyyy"
                      )}`}
                      keys={{
                        Y: "day",
                        X: "total",
                      }}
                    />
                    <OverallInfoCard
                      type="is ranking #1"
                      icon={<BarChart className="w-6 h-6" strokeWidth={1} />}
                      total={ranking.total}
                      data={ranking.data}
                      label={`Attendance Ranking from ${format(
                        new Date(ranking.dateRange.from),
                        "MM/dd/yyyy"
                      )} - ${format(
                        new Date(ranking.dateRange.to),
                        "MM/dd/yyyy"
                      )}`}
                      keys={{
                        Y: "name",
                        X: "total",
                      }}
                    />
                    <StatsCard>
                      <StatsCard.Header>
                        <div className="bg-bfar mr-4">
                          <ArrowUpLeftFromCircle size={18} strokeWidth={1} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            Quick Actions
                          </span>
                        </div>
                      </StatsCard.Header>
                      <StatsCard.Body>
                        <div className="w-full h-[150px] mr-4 px-4 space-y-1">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              navigate(
                                `${Links.DAILY_TIME_RECORDS}?ref=quick-action`
                              )
                            }
                          >
                            Generate DTR
                          </Button>
                        </div>
                      </StatsCard.Body>
                    </StatsCard>
                    {/* <OverallInfoCard
                      total={data.overallStats.attendance.total}
                      data={data.overallStats.attendance.data}
                      label={`Total Attendances for ${startOfMonth(
                        new Date()
                      ).toLocaleDateString()} - ${addDays(
                        startOfMonth(new Date()),
                        14
                      ).toLocaleDateString()}`}
                      keys={{
                        Y: "day",
                        X: "total",
                      }}
                    /> */}
                  </>
                )}
                {/* <OverallInfoCard data={["a"]} />
                <OverallInfoCard data={["a"]} /> */}
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
              <h1 className="text-md  font-semibold mb-3 ">
                <span>Recent Attendances </span>
              </h1>
              <StatsContainer className=" mb-2">
                {!isPending ? (
                  <Carousel className="w-full hover:cursor-grab active:cursor-grabbing ">
                    {recentAttendances.length ? (
                      <CarouselContent className=" max-w-sm md:max-w-md lg:max-w-lg">
                        {recentAttendances.map((recent: TDailyTimeRecord) => {
                          return (
                            <CarouselItem className="pl-1 " key={recent.id}>
                              <AttendanceInfoCard data={recent} />
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                    ) : (
                      <IsEmptyContent
                        icon={<CalendarOff size={35} strokeWidth={1.5} />}
                        label="No recent attendance for today."
                      />
                    )}
                    {recentAttendances.length !== 0 && (
                      <>
                        <CarouselPrevious
                          variant="secondary"
                          className="-left-9"
                        />
                        <CarouselNext
                          variant="secondary"
                          className="-right-9"
                        />
                      </>
                    )}
                  </Carousel>
                ) : (
                  <Skeleton className="w-full h-[150px] mr-4 px-4" />
                )}
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
  const Aside = (
    <div className="flex flex-col items-center h-full p-6">
      <div className="space-y-2 bg-card rounded border">
        <h1 className="text-sm font-semibold ml-4 mt-4">Upcoming holidays</h1>
        <Calendar />
      </div>
    </div>
  );

  const AsideContainer = isMobile ? (
    <aside
      className="
md:top-[5.3rem]   md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col justify-center items-center"
    >
      {Aside}
    </aside>
  ) : (
    Aside
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
              md:top-[4.3rem]   md:h-[calc(100vh-3.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col justify-center items-center"
            >
              {AsideContainer}
            </ResizablePanel>
          </>
        ) : (
          <>
            {MainContent}
            {AsideContainer}
          </>
        )}
      </Main.Content>
    </>
  );
}

export default Dashboard;
