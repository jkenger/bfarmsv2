import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BFARLogo from "@/components/ui/logo";
import Main from "@/components/wrappers/Main";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Calendar } from "@/components/ui/calendar";

import { LogOut } from "lucide-react";
import { GetQueryType, IconProperties, Links } from "@/types/common";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { defer, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { getDashboard } from "./api/dashboard.api";
import { QueryClient, useQuery } from "@tanstack/react-query";
// import { addDays, startOfMonth } from "date-fns";

import RecentAttendance from "./RecentAttendance";
import { fetch } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getDashboard({ type: GetQueryType.ALL })),
  });
};

function Dashboard() {
  const { data, isPending } = useQuery(
    getDashboard({ type: GetQueryType.ALL })
  );

  const navigate = useNavigate();
  // const attendance = data?.overallStats?.attendance || [];
  // const ranking = data?.overallStats?.ranking || [];
  const recentAttendances = data?.overallStats?.recentAttendances || [];
  const isMobile = useMediaQuery("(max-width: 1180px)");
  // const navigate = useNavigate();

  async function handleLogout() {
    try {
      const result = await fetch.get(Links.LOGOUT);
      if (result.status === 200) {
        navigate(Links.LOGIN);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging out",
      });
    }
  }

  const MainContent = (
    <>
      {/* Image */}
      <div className="bg-coral-mobile md:bg-coral-web bg-contain bg-no-repeat mb-2 h-full relative">
        {/* Container Content */}
        <div className=" lg:pt-48 lg:p-10  h-full  backdrop-blur-[1px]">
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
            <Button
              size="sm"
              variant="ghost"
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut size={IconProperties.SIZE} />
              <span>Log out</span>
            </Button>
          </div>
          <h1 className="text-lg font-semibold mt-4">Welcome, Ken Gervacio</h1>
          {/* Content */}
          {/* <PayrollStats isPending={isPending} />
          <OverallStats isPending={isPending} attendance={attendance} ranking={ranking} /> */}
          <RecentAttendance
            isPending={isPending}
            recentAttendances={recentAttendances}
          />
        </div>
      </div>
    </>
  );
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
