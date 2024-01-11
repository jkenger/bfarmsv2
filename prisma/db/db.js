import { PrismaClient } from "@prisma/client";
import {
  addDays,
  differenceInHours,
  eachDayOfInterval,
  isWeekend,
} from "date-fns";
import { countWeekdays, setDateTime } from "../../lib/helpers.js";

import cron from "node-cron";

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
        let error;
        const from = options.range.from;
        const to = options.range.to;

        if (!from || !to) {
          error = new Error("Please provide a valid date range");
          error.statusCode = 400;
          throw error;
        }

        // VARIABLES
        let allEmployees = await prisma.user.findMany({
          include: {
            attendances: true,
            designation: true,
            deductions: true,
          },
        });

        const id = options.where.id ? options.where.id : null;
        let employeesInPayrollGroup = await prisma.user.findMany({
          where: {
            AND: [
              {
                payrollGroupId: options.where.payrollGroupId,
              },
              id ? { id: { contains: id } } : {},
            ],
          },
          include: {
            attendances: true,
            designation: true,
            deductions: true,
            payrollGroup: true,
          },
        });

        if (!employeesInPayrollGroup.length) {
          error = new Error("No employees found in the payroll group");
          error.statusCode = 404;
          throw error;
        }

        // let employees = employeesInPayrollGroup.filter((employee) => {
        //   return employee.attendances.some((attendance) => {
        //     return (
        //       attendance.attendanceDate > from &&
        //       attendance.attendanceDate <= to
        //     );
        //   });
        // });

        let employees = employeesInPayrollGroup.map((employee) => ({
          ...employee,
          attendances: employee.attendances.filter((attendance) => {
            const attendanceDate = new Date(attendance.attendanceDate);
            return attendanceDate >= from && attendanceDate <= to;
          }),
        }));

        if (!employees.length) {
          error = new Error(
            "No attendance found from employees in the payroll group"
          );
          error.statusCode = 404;
          throw error;
        }

        // Daily Rate x No. Of Working Days in a Month x Total Nos. of Hours Absent/Total Number of Working Hours in a Day

        // No of working days in semimonthly
        const calendarDays =
          countWeekdays(from, to) < 10
            ? countWeekdays(from, new Date(addDays(from, 14)))
            : countWeekdays(from, to);

        let holidayDates = await prisma.holiday.getHolidayDates(from, to);

        let taxCompensationRange = {
          tax_1: { r1: 10417, r2: 16666, prcnt: 0.02 }, //2%
          tax_2: { r1: 16667, r2: 33332, prcnt: 0.05 }, //5%
          tax_3: { r1: 33333, r2: 83332, prcnt: 0.1 }, //10%
        };

        const toCalendarDays = (count) => {
          return count > calendarDays ? calendarDays : count;
        };

        // If range is provided, filter attendances
        employees = await employees.map((employee) => {
          // salary
          if (!employee.designationId) {
            let error = new Error(
              "No designation found on employee " +
                employee.id +
                " " +
                employee.fullName
            );
            error.statusCode = 404;
            throw error;
          }
          const monthlySalary = employee.designation?.salary || 0;

          const salary = {
            monthly: {
              total: monthlySalary,
              daily: +(monthlySalary / calendarDays).toFixed(2) || 0,
            },
            semiMonth: {
              total: +(monthlySalary / 2).toFixed(2) || 0,
              daily: +(monthlySalary / 2 / calendarDays).toFixed(2) || 0,
            },
          };

          // holiday data
          const attendanceMatchedHolidays = holidayDates.filter((holiday) => {
            return employee.attendances.some(
              (att) =>
                setDateTime(0, 0, 0, 0, att.attendanceDate).toString() ===
                setDateTime(0, 0, 0, 0, holiday.prerequisiteDate).toString()
            );
          });
          const missingAttendanceMatchedHolidays = holidayDates.filter(
            (holiday) => {
              return !employee.attendances.some(
                (att) =>
                  setDateTime(0, 0, 0, 0, att.attendanceDate).toString() ===
                  setDateTime(0, 0, 0, 0, holiday.prerequisiteDate).toString()
              );
            }
          );
          const holidaysCount = attendanceMatchedHolidays.length;
          const deductedHolidaysCount =
            attendanceMatchedHolidays.length === 0
              ? holidayDates.length
              : holidayDates.length - attendanceMatchedHolidays.length < 0
              ? 0
              : attendanceMatchedHolidays.length === 0
              ? holidayDates.length
              : holidayDates.length - attendanceMatchedHolidays.length;
          const holidayData = {
            dates: {
              all: holidayDates,
              matched: attendanceMatchedHolidays,
              missing: missingAttendanceMatchedHolidays,
            },
            additional: {
              count: holidaysCount,
              amount: salary.semiMonth.daily * attendanceMatchedHolidays.length,
            },
            deduction: {
              count: deductedHolidaysCount,
              amount: salary.semiMonth.daily * deductedHolidaysCount,
            },
          };

          const employeeDeductions = employee.deductions.map((deduction) => {
            return {
              name: deduction.name,
              amount: deduction.amount,
            };
          });

          // attendance data
          const attendanceWithHalfDay = employee.attendances.filter(
            (attendance) => attendance.isHalfDay
          );

          const daysCount = employee.attendances
            ? toCalendarDays(employee.attendances.length)
            : 0;
          const daysWithHalfDay = toCalendarDays(
            daysCount - attendanceWithHalfDay.length / 2
          );
          const daysWithHolidays = toCalendarDays(
            holidaysCount
              ? daysWithHalfDay + holidaysCount
              : deductedHolidaysCount
              ? daysWithHalfDay - deductedHolidaysCount
              : daysWithHalfDay
          );

          const undertime = employee.attendances
            .filter((attendance) => attendance.undertime > 0)
            .reduce(
              (acc, attendance) => acc + attendance.undertime, // minutes
              0
            );

          const attendanceData = {
            attendances: employee.attendances,
            from: from,
            to: to,
            days: employee.attendances.length,
            regularDays: daysCount,
            days: {
              days: daysCount,
              calendarDays: calendarDays,
              withHalfDays: daysWithHalfDay,
              withHolidays: daysWithHolidays < 0 ? 0 : daysWithHolidays,
            },
          };
          const gross = {
            absents: {
              days: calendarDays - daysWithHolidays,
              amount:
                (calendarDays - daysWithHolidays) * salary.semiMonth.daily,
            },
            undertime: {
              minutes: undertime,
              amount: +((salary.semiMonth.daily / 8 / 60) * undertime).toFixed(
                2
              ),
            },
          };

          const adtlDeductions = {
            deductions: employeeDeductions,
            amount: employeeDeductions.reduce(
              (acc, deduction) => acc + deduction.amount,
              0
            ),
          };

          const net = {
            // map and return deduction name and amount
            taxes: {
              tax1:
                salary.semiMonth.total < taxCompensationRange.tax_1.r1
                  ? 0
                  : salary.semiMonth.total > taxCompensationRange.tax_1.r1 &&
                    salary.semiMonth.total <= taxCompensationRange.tax_1.r2
                  ? +(
                      (salary.semiMonth.total - 10417) *
                      taxCompensationRange.tax_1.prcnt
                    ).toFixed(2)
                  : 0,
              tax5:
                salary.semiMonth.total < taxCompensationRange.tax_2.r1
                  ? 0
                  : salary.semiMonth.total > taxCompensationRange.tax_2.r1 &&
                    salary.semiMonth.total <= taxCompensationRange.tax_2.r2
                  ? +(
                      (salary.semiMonth.total - 10417) *
                      taxCompensationRange.tax_2.prcnt
                    ).toFixed(2)
                  : 0,
              tax10:
                salary.semiMonth.total < taxCompensationRange.tax_3.r1
                  ? 0
                  : salary.semiMonth.total > taxCompensationRange.tax_3.r1 &&
                    salary.semiMonth.total <= taxCompensationRange.tax_3.r2
                  ? +(
                      (salary.semiMonth.total - 10417) *
                      taxCompensationRange.tax_3.prcnt
                    ).toFixed(2)
                  : 0,
            },
            adtl: adtlDeductions,
          };

          const totals = {
            gross: {
              amountDue: +(
                salary.semiMonth.total -
                (gross.absents.amount + gross.undertime.amount)
              ).toFixed(2),
              deductions: {
                total: +(gross.absents.amount + gross.undertime.amount),
                breakdown: {
                  ...gross,
                  holiday: {
                    ...holidayData.dates,
                    ...holidayData.deduction,
                  },
                },
              },
              earned: {
                total: +holidayData.additional.amount,
                breakdown: {
                  holiday: {
                    ...holidayData.dates,
                    ...holidayData.additional,
                  },
                },
              },
            },
            net: {
              amountDue: +(
                salary.semiMonth.total -
                (gross.absents.amount + gross.undertime.amount) -
                (net.taxes.tax1 + net.taxes.tax5 + net.taxes.tax10) -
                net.adtl.amount
              ).toFixed(2),
              deductions: {
                total: +(
                  net.taxes.tax1 +
                  net.taxes.tax5 +
                  net.taxes.tax10 +
                  net.adtl.amount
                ).toFixed(2),
                breakdown: {
                  taxes: {
                    ...net.taxes,
                  },
                  adtl: {
                    ...net.adtl,
                  },
                },
              },
            },
          };
          // DELETE DUPLICATE FIELDS
          delete employee.attendances;
          return {
            ...employee,
            // Attendance count
            salary,
            holidayData,
            attendanceData,
            totals,
          };
        });

        const allEmployeesCount = allEmployees.length;

        return { allEmployees, allEmployeesCount, employees };
      },
    },
  },
  query: {
    travelpass: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create" || operation === "update") {
          const from = new Date(args.data.start);
          const to = new Date(args.data.end);
          const attendanceExist = await prisma.attendance.findMany({
            where: {
              AND: [
                {
                  userId: args.data.userId,
                },
                {
                  attendanceDate: {
                    gte: from,
                    lte: to,
                  },
                },
              ],
            },
          });

          if (attendanceExist.length > 0) {
            throw new Error(
              `Employee has existing attendance for ${attendanceExist.map(
                (att) => new Date(att.attendanceDate).toDateString()
              )}`
            );
          }
          // get the number of days between from and to

          const dateArray = eachDayOfInterval({ start: from, end: to }).filter(
            (date) => !isWeekend(date)
          );

          const user = await prisma.user.findUnique({
            where: {
              id: args.data.userId,
            },
          });

          if (!user) {
            throw new Error("Employee not found");
          }
          const attendanceToBeCreated = dateArray.map((date) => ({
            fullName: user.fullName,
            attendanceDate: date,
            amTimeIn: null,
            amTimeOut: null,
            pmTimeIn: null,
            pmTimeOut: null,
            isHalfDay: false,
            travelPass: args.data.typeOf,
            noOfHoursWorked: 8,
            undertime: 0,
          }));

          const createdAttendance = await prisma.user.update({
            where: {
              id: args.data.userId,
            },
            data: {
              attendances: {
                create: attendanceToBeCreated,
              },
            },
          });
        }
        return query(args);
      },
    },
    attendance: {
      async $allOperations({ operation, args, query }) {
        if (operation.includes("create") || operation === "update") {
          const currentDateTime = args.data.amTimeIn
            ? new Date(args.data.amTimeIn)
            : args.data.pmTimeIn
            ? new Date(args.data.pmTimeIn)
            : new Date();

          // shift time | 8 hours
          const shiftTime = 8;

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

          let undertime = shiftTime;
          let noOfHoursWorked = 0;
          let isHalfDay =
            (!amTimeIn && !amTimeOut) || (!pmTimeIn && !pmTimeOut);

          // if (amTimeIn) {
          //   undertime =
          //     amTimeIn < eightAm ? differenceInHours(eightAm, amTimeIn) : 0;
          // }

          if (amTimeOut) {
            noOfHoursWorked = differenceInHours(
              amTimeOut,
              amTimeIn > eightAm ? amTimeIn : eightAm
            );
            undertime = shiftTime - noOfHoursWorked;
          }
          if (pmTimeOut) {
            noOfHoursWorked += differenceInHours(
              pmTimeOut,
              pmTimeIn > onePm ? pmTimeIn : onePm
            );
            undertime = shiftTime - noOfHoursWorked;
          }
          const date = amTimeIn || pmTimeIn;
          return query({
            ...args,
            data: {
              ...args.data,
              // If late, set late to true
              undertime,
              noOfHoursWorked,
              isHalfDay,
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
          const user = await prisma.user.findUnique({
            where: {
              id: args.data?.id || args.where.id,
            },
          });
          return await query({
            ...args,
            data: {
              ...args.data,
              fullName: `${user.lastName} ${user.firstName} ${
                user.middleName ? user.middleName : ""
              }`,
            },
          });
        }

        return query(args);
      },
    },
    payroll: {
      async create({ model, args, query }) {
        const payroll = await query({
          ...args,
          include: { payrollGroup: true },
        });
        if (payroll) {
          return await prisma.payroll.update({
            where: { id: payroll.id },
            data: {
              payrollNumber: `PAY-${payroll.id}`,
              fundCluster: payroll.payrollGroup.fundCluster,
              projectName: payroll.payrollGroup.name,
              programName: payroll.payrollGroup.programName,
            },
          });
        }

        // Delete created payroll if no payroll is created
        return await prisma.payroll.delete({ where: { id: payroll.id } });
      },
    },

    // Receipt operations
    receipt: {
      async create({ args, query }) {
        const receipt = await query({
          ...args,
          include: { user: { include: { designation: true } } },
        });
        if (receipt) {
          return await prisma.receipt.update({
            where: { id: receipt.id },
            data: {
              name: receipt.user.fullName,
              designation: receipt.user.designation.name,
              salary: receipt.user.designation.salary,
            },
          });
        }
        // Delete created receipt if no receipt is created
        return await prisma.receipt.delete({ where: { id: receipt.id } });
      },
    },
  },
});

// cron
// 0 0 * * *
cron.schedule("0 0 * * *", async () => {
  console.log("Running job to delete expired records...");
  // Replace the following logic with your own logic to identify and delete expired records
  try {
    // Your Prisma code here
    const deleted = await prisma.travelpass.deleteMany({
      where: {
        expireAt: {
          lte: new Date(),
        },
      },
    });
    console.log("Deleted ", count + " records");
  } catch (error) {
    console.error("Error:", error);
  }
});

export default prisma;
