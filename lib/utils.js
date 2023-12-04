export const createQueryObject = (req, searchFilter) => {
  const search = req.query.search?.trim();
  const page = Number(req.query.page) || 1;
  const sp = req.query.sp;
  const toSort = sp?.split(",")[0];
  const sortOrder = sp?.split(",")[1];
  const path = req.path;

  const limit = Number(req.query.limit) || 10;
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
      where: searchFilter(search),
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
  queryObject = {
    ...queryObject,
    ...filter,
    ...sort,
  };

  return { queryObject, filter, limit };
};

export const employeeSearch = (search) => ({
  // Search through all the fields
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
});
export const designationSearch = (search) => ({
  // Search through all the fields
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
});