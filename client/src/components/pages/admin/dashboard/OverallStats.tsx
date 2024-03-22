import StatsCard from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import OverallInfoCard from '@/components/ui/overall-info-card';
import StatsContainer from '@/components/ui/stats-container';
import { Links } from '@/types/common';
import { format } from 'date-fns';
import { ArrowUpLeftFromCircle, BarChart, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OverallStats = ({isPending, attendance, ranking}: {isPending: boolean, attendance: any, ranking: any}) => {
  const navigate = useNavigate();
  return (
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
                icon={<CalendarDays className="w-6 h-6" strokeWidth={1} />}
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
                )} - ${format(new Date(ranking.dateRange.to), "MM/dd/yyyy")}`}
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
                    <span className="text-muted-foreground">Quick Actions</span>
                  </div>
                </StatsCard.Header>
                <StatsCard.Body>
                  <div className="w-full h-[150px] mr-4 px-4 space-y-1">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        navigate(`${Links.DAILY_TIME_RECORDS}?ref=quick-action`)
                      }
                    >
                      Generate DTR
                    </Button>
                  </div>
                </StatsCard.Body>
              </StatsCard>
            </>
          )}
        </StatsContainer>
      </div>
    </div>
  );
}

export default OverallStats