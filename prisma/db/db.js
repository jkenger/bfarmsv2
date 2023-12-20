import { PrismaClient } from "@prisma/client";
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
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create") {
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
        if (operation === "update") {
          const user = await query(args);
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
  },
});

export default prisma;
