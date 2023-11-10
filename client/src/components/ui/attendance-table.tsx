import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// type Props = { children?: React.ReactNode };

function AttendanceTable() {
  return (
    <Table>
      <TableCaption>List of recent attendance.</TableCaption>
      <TableBody>
        <TableRow>
          <TableCell className="">
            <div className="flex items-center justify-start gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=13"
                    alt="@shadcn"
                  />
                  <AvatarFallback>Ken</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Ken Gervacio</p>
                <span className="text-muted-foreground">Name</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">07:00 am</p>
              <span className="text-muted-foreground">Time in</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">--:-- --</p>
              <span className="text-muted-foreground">Time out</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">On time</p>
              <span className="text-muted-foreground">Status</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="">
            <div className="flex items-center justify-start gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=41"
                    alt="@shadcn"
                  />
                  <AvatarFallback>NN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Ning Ning Ruo</p>
                <span className="text-muted-foreground">Name</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">08:24 am</p>
              <span className="text-muted-foreground">Time in</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">--:-- --</p>
              <span className="text-muted-foreground">Time out</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">Late</p>
              <span className="text-muted-foreground">Status</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="">
            <div className="flex items-center justify-start gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=33"
                    alt="@shadcn"
                  />
                  <AvatarFallback>Ruvi</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col ">
                <p className="font-medium">Ruvii Iana</p>
                <span className="text-muted-foreground">Name</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">07:53 am</p>
              <span className="text-muted-foreground">Time in</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">--:-- --</p>
              <span className="text-muted-foreground">Time out</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">On time</p>
              <span className="text-muted-foreground">Status</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="">
            <div className="flex items-center justify-start gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=33"
                    alt="@shadcn"
                  />
                  <AvatarFallback>Ruvi</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col ">
                <p className="font-medium">Ruvii Iana</p>
                <span className="text-muted-foreground">Name</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">07:53 am</p>
              <span className="text-muted-foreground">Time in</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">--:-- --</p>
              <span className="text-muted-foreground">Time out</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <p className="font-medium">On time</p>
              <span className="text-muted-foreground">Status</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default AttendanceTable;
