import AttendanceInfoCard from '@/components/ui/attendance-info-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import IsEmptyContent from '@/components/ui/isempty-content';
import { Skeleton } from '@/components/ui/skeleton';
import StatsContainer from '@/components/ui/stats-container';
import { CalendarOff } from 'lucide-react';


const RecentAttendance = ({
  isPending,
  recentAttendances,
}: {
  isPending: boolean;
  recentAttendances: any;
}) => {
  return (
    <div className="mt-8 flex gap-4">
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
                  <CarouselPrevious variant="secondary" className="-left-9" />
                  <CarouselNext variant="secondary" className="-right-9" />
                </>
              )}
            </Carousel>
          ) : (
            <Skeleton className="w-full h-[150px] mr-4 px-4" />
          )}
        </StatsContainer>
      </div>
    </div>
  );
};

export default RecentAttendance