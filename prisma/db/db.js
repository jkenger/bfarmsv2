import { PrismaClient } from "@prisma/client";
import { differenceInMinutes } from "date-fns";
import { setDateTime } from "../../lib/helpers.js";
const prisma = new PrismaClient().$extends({
  model: {
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
    },
  },
  query: {
    // @todo: attendance late minutes and undertime minutes should always update when time in and time out is updated
    attendance: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create" || operation === "update") {
          console.log("args data", args.data);
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

          const amLateDifference =
            differenceInMinutes(amTimeIn, eightAm) > 0
              ? differenceInMinutes(amTimeIn, eightAm)
              : 0;

          const pmLateDifference =
            differenceInMinutes(pmTimeIn, onePm) > 0
              ? differenceInMinutes(pmTimeIn, onePm)
              : 0;
          let lateMinutes = amLateDifference + pmLateDifference;

          const amUndertimeDifference =
            differenceInMinutes(twelvePm, amTimeOut) > 0 && amTimeOut
              ? differenceInMinutes(twelvePm, amTimeOut)
              : 0;
          const pmUndertimeDifference =
            differenceInMinutes(fivePm, pmTimeOut) > 0 && pmTimeOut
              ? differenceInMinutes(fivePm, pmTimeOut)
              : 0;

          let undertimeMinutes = amUndertimeDifference + pmUndertimeDifference;

          if (currentDateTime < twelvePm) {
            return query({
              ...args,
              data: {
                ...args.data,
                lateMinutes,
                undertimeMinutes,
              },
            });
          }
          if (currentDateTime > twelvePm) {
            console.log(
              "currentDateTime",
              differenceInMinutes(currentDateTime, onePm)
            );
            return query({
              ...args,
              data: {
                ...args.data,
                lateMinutes,
                undertimeMinutes,
              },
            });
          }

          if (currentDateTime < onePm) {
            return query({
              ...args,
              data: {
                ...args.data,
                // If late, set late to true
                lateMinutes,
                undertimeMinutes,
              },
            });
          }

          if (currentDateTime > onePm) {
            return query({
              ...args,
              data: {
                ...args.data,
                lateMinutes,
                undertimeMinutes,
              },
            });
          }
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
