import { PrismaClient } from "@prisma/client";
import { addDays, differenceInMinutes } from "date-fns";
import { countWeekdays, setDateTime } from "../../lib/helpers.js";
import { token } from "morgan";
import { holiday } from "../../lib/utils.js";
const prisma = new PrismaClient().$extends({
  model: {
    holiday: {
      async getHolidayDates(fromDate, toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        let holidayDates = [];
        const holidays = await prisma.holiday.findMany({
          where: {
            requisiteDate: {
              gte: from,
              lte: to,
            },
          },
          orderBy: { createdAt: "asc" },
        });

        holidays.map((holiday) => {
          let date = new Date(holiday.requisiteDate);
          // if holiday date is within two queried date, add as valid holiday dates.
          if (from < date && to > date) {
            // push holiday that is not in holidayDates
            holidayDates.push(holiday);
          }
        });
        console.log("asdas", holidayDates);
        return holidayDates;
      },
    },
    user: {
      async findUserWithId(id) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                rfId: {
                  contains: id,
                },
              },
              {
                employeeId: {
                  contains: id,
                },
              },
            ],
          },
          include: {
            attendances: true,
          },
        });

        if (user) {
          return user;
        }

        return "No Employee Found with the ID  Provided";
      },
      async findUsersAttendance(options) {
        const from = options.range.from;
        const to = options.range.to;

        // VARIABLES
        let allEmployees = await prisma.user.findMany();
        let employees = allEmployees.filter((employee) => {
          return (
            employee.attendances.attendanceDate >= from &&
            employee.attendances.attendanceDate <= to
          );
        });

        let employeeCount;
        let weekDays = countWeekdays(from, to);
        console.log("weekDays", weekDays);
        let holidayDates = await prisma.holiday.getHolidayDates(from, to);
        console.log("holidayDates", holidayDates);

        if (!employees.length) {
          return {
            employees: [],
            employeeCount: 0,
          };
        }

        // If range is provided, filter attendances

        employees = employees.map((employee) => {
          return {
            ...employee,
            // Attendance count
            attendancesCount: employee.attendances.length,
          };
        });

        employeeCount = employees.length ? employees.length : 0;

        return { allEmployees, employees, employeeCount };
      },
    },
  },
  query: {
    attendance: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create" || operation === "update") {
          const currentDateTime = args.data.amTimeIn
            ? new Date(args.data.amTimeIn)
            : args.data.pmTimeIn
            ? new Date(args.data.pmTimeIn)
            : new Date();

          // Get 8 AM date time
          const eightAm = setDateTime(8, 0, 0, 0, currentDateTime);
          // Get 12 PM date time
          const twelvePm = setDateTime(12, 0, 0, 0, currentDateTime);
          // Get 1 PM date time
          const onePm = setDateTime(13, 0, 0, 0, currentDateTime);
          // Get 5 PM date time
          const fivePm = setDateTime(17, 0, 0, 0, currentDateTime);

          const amTimeIn = args.data.amTimeIn
            ? new Date(args.data.amTimeIn)
            : null;
          const amTimeOut = args.data.amTimeOut
            ? new Date(args.data.amTimeOut)
            : null;
          const pmTimeIn = args.data.pmTimeIn
            ? new Date(args.data.pmTimeIn)
            : null;

          const pmTimeOut = args.data.pmTimeOut
            ? new Date(args.data.pmTimeOut)
            : null;

          let lateMinutes = 0;
          let undertimeMinutes = 0;

          if (amTimeIn) {
            lateMinutes =
              amTimeIn > eightAm ? differenceInMinutes(amTimeIn, eightAm) : 0;
          }

          if (amTimeOut) {
            console.log("amTimeOut", amTimeOut);
            console.log("twelvePm", twelvePm);
            undertimeMinutes =
              amTimeOut < twelvePm
                ? differenceInMinutes(twelvePm, amTimeOut)
                : 0;
          }

          if (pmTimeIn) {
            lateMinutes +=
              pmTimeIn > onePm ? differenceInMinutes(pmTimeIn, onePm) : 0;
          }

          if (pmTimeOut) {
            undertimeMinutes +=
              pmTimeOut < fivePm ? differenceInMinutes(fivePm, pmTimeOut) : 0;
          }
          const date = amTimeIn || pmTimeIn;
          return query({
            ...args,
            data: {
              ...args.data,
              // If late, set late to true
              lateMinutes,
              undertimeMinutes,
              attendanceDate: date,
            },
          });
        }
        return query(args);
      },
    },
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create" || operation === "update") {
          return await query({
            ...args,
            data: {
              ...args.data,
              fullName: `${args.data.lastName} ${args.data.firstName} ${
                args.data.middleName ? args.data.middleName : ""
              }`,
            },
          });
        }

        return query(args);
      },
    },
  },
});

export default prisma;
