import StatsCard from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatsContainer from '@/components/ui/stats-container';
import { ArrowUpLeftFromCircle, SquareStack } from 'lucide-react';

const PayrollStats = ({isPending}: {isPending: boolean}) => {
  return (
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
                    <span className="text-muted-foreground">Quick Actions</span>
                  </div>
                </StatsCard.Header>
                <StatsCard.Body className="mb-4">
                  <div className="w-full mr-4 px-4 space-y-1">
                    <Button size="sm" className="w-full">
                      Generate Payroll
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Create Payroll Group
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

export default PayrollStats