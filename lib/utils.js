import { StatusCodes } from "http-status-codes";

export const createQueryObject = (req, searchFilter) => {
  const search = req.query.search?.trim();
  const designations = req.query.designation
    ? req.query.designation.split(",")
    : "";
  const payrollGroups = req.query.payrollGroup
    ? req.query.payrollGroup.split(",")
    : "";
  console.log(payrollGroups);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sp = req.query.sp;
  const toSort = sp?.split(",")[0];
  const sortOrder = sp?.split(",")[1];
  const path = req.path;
  const skip = (page - 1) * limit; // Page 2: (2 - 1) * 10 = 10

  let pageQuery = {
    skip: skip,
    take: limit,
  };
  let filter = {};

  let queryObject = { ...pageQuery };

  //query for search
  if (search || search?.length) {
    filter = {
      where: searchFilter(search).where,
    };
  }

  // select only for specific designation
  if (designations || designations?.length) {
    filter = {
      where: {
        OR: [
          ...designations.map((designation) => ({
            designation: {
              name: {
                contains: designation,
                mode: "insensitive",
              },
            },
          })),
        ],
        ...filter.where,
      },
    };
  }

  // select only for specific payrollGroup
  if (payrollGroups || payrollGroups?.length) {
    filter = {
      where: {
        OR: [
          ...payrollGroups.map((pg) => ({
            payrollGroup: {
              fundCluster: {
                contains: pg,
                mode: "insensitive",
              },
            },
          })),
          ...payrollGroups.map((pg) => ({
            payrollGroup: {
              name: {
                contains: pg,
                mode: "insensitive",
              },
            },
          })),
        ],
        ...filter.where,
      },
    };
  }
  let sort = {
    orderBy: [],
  };
  if (sp || sp?.length) {
    sort = {
      orderBy: [
        {
          [toSort]: sortOrder,
        },
      ],
    };
    if (toSort === "fullName") {
      sort = {
        orderBy: [
          {
            lastName: sortOrder,
          },
          {
            firstName: sortOrder,
          },
          {
            middleName: sortOrder,
          },
        ],
      };
    }

    if (toSort === "fundCluster" && path === "/employees") {
      sort = {
        orderBy: [
          {
            payrollGroup: {
              fundCluster: sortOrder,
            },
          },
        ],
      };
    }

    if (toSort === "payrollGroup" && path === "/employees") {
      sort = {
        orderBy: [
          {
            payrollGroup: {
              name: sortOrder,
            },
          },
        ],
      };
    }
    if (toSort === "designation" && path === "/employees") {
      sort = {
        orderBy: [
          {
            designation: {
              name: sortOrder,
            },
          },
        ],
      };
    }
    if (toSort === "salary" && path === "/employees") {
      sort = {
        orderBy: [
          {
            designation: {
              salary: sortOrder,
            },
          },
        ],
      };
    }
  }

  if (!sp || !sp?.length) {
    const defaultSort = [
      {
        updatedAt: "desc",
      },
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ];
    sort = {
      orderBy: [...sort.orderBy, ...defaultSort],
    };
  }
  queryObject = {
    ...queryObject,
    ...filter,
    ...sort,
    ...searchFilter(search).select,
  };
  console.log(queryObject);
  return { queryObject, filter, limit };
};

export const attendance = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          employeeId: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ],
  },
  select: {
    include: {
      user: true,
    },
  },
});

export const employee = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        employeeId: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        fullName: {
          contains: search,
          equals: search,
          mode: "insensitive",
        },
      },
      {
        fullName: {
          // lastName
          startsWith: search.split(" ").reverse()[0],
          mode: "insensitive",
        },
      },
      {
        fullName: {
          // firstName
          startsWith: search.split(" ")[0],
          mode: "insensitive",
        },
      },
      {
        fullName: {
          contains: search.split(" ").reverse().join(" "),
          mode: "insensitive",
        },
      },
      {
        firstName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        middleName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        payrollGroup: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        designation: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ],
  },
  select: {
    include: {
      designation: true,
      payrollGroup: true,
      deductions: true,
    },
  },
});
export const designation = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
  select: {
    include: {
      users: true,
    },
  },
});

export const payrollGroups = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        fundCluster: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        programName: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
  select: {
    include: {
      users: true,
    },
  },
});

export const holiday = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
});

export const travelpass = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        typeOf: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
  select: {
    include: {
      user: true,
    },
  },
});

export const deductions = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
});

export const leaveTypes = (search) => ({
  // Search through all the fields
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
});
