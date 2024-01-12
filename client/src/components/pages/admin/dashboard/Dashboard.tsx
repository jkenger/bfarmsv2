import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BFARLogo from "@/components/ui/logo";
import Main from "@/components/wrappers/Main";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Calendar } from "@/components/ui/calendar";

function Dashboard() {
  return (
    <>
      <Main.Header>
        <Main.Heading title="Dashboard" />
      </Main.Header>
      <Main.Content isResizable>
        <ResizablePanel
          defaultSize={20}
          maxSize={20}
          minSize={1}
          className="w-full
md:top-[5.3rem]   md:h-[calc(100vh-5.3rem)] shrink-0 md:sticky md:block md:w-auto md:max-w-2xl md:pt-0 flex flex-col items-center"
        >
          <div className="flex flex-col h-full p-6">
            <div className="space-y-2">
              <h1 className="text-sm ml-4">Upcoming holidays</h1>
              <Calendar />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full items-center justify-center p-6">
            <div className="bg-card py-2 px-4 border rounded">
              <h1 className="text-sm font-medium mb-3 mt-2">
                Attendance Today
              </h1>
              <div className="flex  gap-2">
                <div className="flex flex-col gap-2 items-center justify-start  p-4 ">
                  <Avatar>
                    <AvatarFallback>
                      <BFARLogo />
                    </AvatarFallback>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=1"
                      alt="employee logo"
                    />
                  </Avatar>
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Senota, Alexa S.</span>
                    <span className="text-xs text-muted-foreground">
                      Aquaculturist
                    </span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <Avatar>
                    <AvatarFallback>
                      <BFARLogo />
                    </AvatarFallback>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=1"
                      alt="employee logo"
                    />
                  </Avatar>
                  <span className="text-xs">Senota, Alexa S.</span>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        {/* <StatsContainer>
          <StatsCard>
            <StatsCard.Header>
              <span>Total Employees</span>
              <User size={IconProperties.SIZE_ICON} />
            </StatsCard.Header>
            <StatsCard.Body>
              <span>20</span>
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

        <div className="mt-2 flex gap-2">
          <div className="bg-card w-1/2 p-2 px-4 border rounded">
            <h1 className="text-md font-medium mb-3 mt-2">
              Monthly Attendance Summary
            </h1>
            <CurvedlineChart className="w-full aspect-video pb-0" />
          </div>
          <div className="bg-card w-1/2  p-2 px-4 border rounded">
            <h1 className="text-md font-medium mb-3 mt-2">
              Recent Attendances
            </h1>
            <CurvedlineChart className="w-full aspect-video pb-0" />
          </div>
        </div> */}
      </Main.Content>
    </>
  );
}

export default Dashboard;
