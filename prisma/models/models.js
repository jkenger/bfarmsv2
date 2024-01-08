import { StatusCodes } from "http-status-codes";
import { createQueryObject } from "../../lib/utils.js";

function createExplicitQuery(data, relation, action = "create") {
  const explicitFields = relation.fields;

  const query = data;

  explicitFields.forEach((field) => {
    if (action === "create") {
      if (!query[field] || !query[field].length) return delete query[field];

      console.log(query[field]);
      if (query[field].length) {
        query[field] = {
          connect: [
            ...query[field].map((item) => {
              return { id: item.id };
            }),
          ],
        };
      }
    }
    if (action === "update") {
      // when updating, when field is empty, return immediately and do not update
      if (!query[field] || !query[field].length)
        return (query[field] = { set: [] });

      if (query[field].length)
        query[field] = {
          set: [
            ...query[field].map((item) => {
              return { id: item.id };
            }),
          ],
        };
    }
    console.log(query[field]);
  });

  return query;
}

export const models = {
  addModel: async (
    res,
    data,
    prismaModel,
    relation = { type: "", fields: [] },
    jsonReturn = null
  ) => {
    if (Array.isArray(data)) {
      console.log("Multiple data adding", data);
      if (data?.length > 1) {
        let addedData = [];
        data.forEach(async (item) => {
          const data = await prismaModel.create({
            data: item,
          });
          addedData.push(data);
        });
        console.log("data added");
        return res.status(StatusCodes.OK).json({
          message: addedData,
        });
      }
    }

    // DONE: make it dynamic for multiple fields
    if (relation?.type === "explicit") {
      const createQuery = createExplicitQuery(data[0], relation);

      const dataAdded = await prismaModel.create({ data: createQuery });
      return res.status(StatusCodes.OK).json(
        jsonReturn
          ? jsonReturn
          : {
              data: dataAdded,
            }
      );
    }

    const dataAdded = await prismaModel.create({
      data: data[0],
    });
    return res.status(StatusCodes.OK).json(
      jsonReturn
        ? jsonReturn
        : {
            data: dataAdded,
          }
    );
  },
  updateModel: async (
    res,
    id,
    data,
    prismaModel,
    relation,
    jsonReturn = null
  ) => {
    if (relation?.type === "explicit") {
      const updateQuery = createExplicitQuery(data[0], relation, "update");
      const dataUpdated = await prismaModel.update({
        where: {
          id: id,
        },
        data: updateQuery,
      });
      return res.status(StatusCodes.OK).json(
        jsonReturn
          ? jsonReturn
          : {
              data: dataUpdated,
            }
      );
    }
    const dataUpdated = await prismaModel.update({
      where: {
        id: id,
      },
      data: data[0],
    });
    return res.status(StatusCodes.OK).json(
      jsonReturn
        ? jsonReturn
        : {
            data: dataUpdated,
          }
    );
  },
  deleteModel: async (res, id, prismaModel, jsonReturn = null) => {
    const dataDeleted = await prismaModel.delete({
      where: {
        id: id,
      },
    });
    return res.status(StatusCodes.OK).json(
      jsonReturn
        ? jsonReturn
        : {
            data: dataDeleted,
          }
    );
  },
  getAllModel: async (res, prismaModel, jsonReturn = null) => {
    const data = await prismaModel.findMany();
    if (!data || !data.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json(
      jsonReturn
        ? jsonReturn
        : {
            data,
          }
    );
  },
  getPaginatedModel: async (
    req,
    res,
    prismaModel,
    toQuery,
    jsonReturn = null
  ) => {
    const { queryObject, filter, limit } = createQueryObject(req, toQuery);

    const data = await prismaModel.findMany({
      ...queryObject,
    });

    const dataCount = await prismaModel.count(filter);
    const numOfPages = Math.ceil(dataCount / limit);
    if (!data || !data.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: [],
        numOfPages: 0,
      });
    }
    return res.status(StatusCodes.OK).json(
      jsonReturn
        ? jsonReturn
        : {
            data,
            numOfPages,
          }
    );
  },
};
