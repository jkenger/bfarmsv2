import { StatusCodes } from "http-status-codes";
import { createQueryObject } from "../../lib/utils.js";

export const models = {
  addModel: async (
    res,
    data,
    prismaModel,
    relation = { type: "", fields: [] }
  ) => {
    console.log(data);
    console.log(relation);
    if (Array.isArray(data)) {
      if (data?.length > 1) {
        console.log("Multiple data adding");
        const addedData = await prismaModel.createMany({
          data: data,
          skipDuplicates: true,
        });
        console.log("data added");
        return res.status(StatusCodes.OK).json({
          message: addedData,
        });
      }
    }

    // TODO: make it dynamic for multiple fields
    if (relation.type === "explicit" && data[0].deductionIds?.length) {
      const dataAdded = await prismaModel.create({
        data: {
          ...data[0],
          deductions: {
            connect: [
              ...data[0].deductionIds.map((id) => ({
                id: id,
              })),
            ],
          },
        },
      });
      return res.status(StatusCodes.OK).json({
        data: dataAdded,
      });
    }
    const dataAdded = await prismaModel.create({
      data: data[0],
    });
    return res.status(StatusCodes.OK).json({
      data: dataAdded,
    });
  },
  updateModel: async (res, id, data, prismaModel) => {
    const dataUpdated = await prismaModel.update({
      where: {
        id: id,
      },
      data: data[0],
    });
    return res.status(StatusCodes.OK).json({
      message: dataUpdated,
    });
  },
  deleteModel: async (res, id, prismaModel) => {
    console.log(id);
    const dataDeleted = await prismaModel.delete({
      where: {
        id: id,
      },
    });
    return res.status(StatusCodes.OK).json({
      data: dataDeleted,
    });
  },
  getAllModel: async (res, prismaModel) => {
    const data = await prismaModel.findMany();
    if (!data || !data.length) {
      return res.status(StatusCodes.OK).json({
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json({
      data,
    });
  },
  getPaginatedModel: async (req, res, prismaModel, toQuery) => {
    const { queryObject, filter, limit } = createQueryObject(req, toQuery);

    const data = await prismaModel.findMany(queryObject);

    const dataCount = await prismaModel.count(filter);
    const numOfPages = Math.ceil(dataCount / limit);
    if (!data || !data.length) {
      return res.status(StatusCodes.OK).json({
        data: [],
        numOfPages: 0,
      });
    }
    return res.status(StatusCodes.OK).json({
      data,
      numOfPages,
    });
  },
};
