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
        let employeesInPayrollGroup = await prisma.user.findMany({
          where: {
            payrollGroupId: options.where.payrollGroupId,
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

        let employees = employeesInPayrollGroup.filter((employee) => {
          return employee.attendances.some((attendance) => {
            return (
              attendance.attendanceDate > from &&
              attendance.attendanceDate <= to
            );
          });
        });
        if (!employees.length) {
          error = new Error(
            "No attendance found from employees in the payroll group"
          );
          error.statusCode = 404;
          throw error;
        }

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
            .filter((attendance) => attendance.undertimeMinutes > 0)
            .reduce(
              (acc, attendance) => acc + attendance.undertimeMinutes, // minutes
              0
            );
          const late = employee.attendances

            .filter((attendance) => attendance.lateMinutes > 0)
            .reduce(
              (acc, attendance) => acc + attendance.lateMinutes, // minutes
              0
            );
          const attendanceData = {
            attendances: employee.attendances,
            days: employee.attendances.length,
            days: {
              days: daysCount,
              calendarDays: calendarDays,
              withHalfDays: daysWithHalfDay,
              withHolidays: daysWithHolidays,
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
            late: {
              minutes: late,
              amount: +((salary.semiMonth.daily / 8 / 60) * late).toFixed(2),
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
                (gross.absents.amount +
                  gross.late.amount +
                  gross.undertime.amount)
              ).toFixed(2),
              deductions: {
                total: +(
                  gross.absents.amount +
                  gross.late.amount +
                  gross.undertime.amount
                ),
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
                (gross.absents.amount +
                  gross.late.amount +
                  gross.undertime.amount) -
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
    attendance: {
      async $allOperations({ operation, args, query }) {
        if (operation.includes("create") || operation === "update") {
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
          let isHalfDay = false;

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
            isHalfDay = !pmTimeIn && !pmTimeOut ? true : false;
          }

          if (pmTimeIn) {
            lateMinutes +=
              pmTimeIn > onePm ? differenceInMinutes(pmTimeIn, onePm) : 0;
          }

          if (pmTimeOut) {
            undertimeMinutes +=
              pmTimeOut < fivePm ? differenceInMinutes(fivePm, pmTimeOut) : 0;
            isHalfDay = !amTimeIn && !amTimeOut ? true : false;
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
              isHalfDay,
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

export default prisma;
