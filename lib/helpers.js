import asyncHandler from "express-async-handler";

export const setDateTime = (h, m, s, ms, mDate) => {
  const hour = h ? h : 0;
  const minute = m ? m : 0;
  const second = s ? s : 0;
  const milisec = ms ? ms : 0;
  const date = mDate ? new Date(mDate) : new Date();
  date.setHours(hour, minute, second, milisec);
  return date;
};

export const createStartDate = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const createEndDate = (date) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};
export const countWeekdays = (startDate, endDate) => {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};
export const createPayrollReceipts = asyncHandler(
  async (prisma, data, payrollId) => {
    const receiptData = data.map((item) => {
      return {
        payrollId: payrollId,
        userId: item.id,
        noOfDays: item.attendanceData.days.withHolidays,
        grossAmountEarned: item.totals.gross.amountDue,
        tax1: item.totals.net.deductions.breakdown.taxes.tax1 || null,
        tax5: item.totals.net.deductions.breakdown.taxes.tax5 || null,
        tax10: item.totals.net.deductions.breakdown.taxes.tax10 || null,
        netAmountDue: item.totals.net.amountDue,
      };
    });
    const inserts = receiptData.map((item) =>
      prisma.receipt.create({
        data: item,
      })
    );
    const createdReceipt = await prisma.$transaction(inserts);
    if (!createdReceipt.length) {
      return {
        count: 0,
      };
    }
    if (createdReceipt.length) {
      const updatePayroll = await prisma.payroll.update({
        where: {
          id: payrollId,
        },
        data: {
          receipts: {
            set: createdReceipt.map((item) => {
              return {
                id: item.id,
              };
            }),
          },
        },
      });
      console.log(updatePayroll);
      return updatePayroll;
    }

    // console.log(createdReceipt);

    // await models.addModel(res, req.body, prisma.receipt);
  }
);

export const createCards = asyncHandler(async (prisma, data, timeCardId) => {
  const timeCardData = data.attendanceData.attendances.map((item) => {
    return {
      timeCardId: timeCardId,
      amTimeIn: item.amTimeIn,
      amTimeOut: item.amTimeOut,
      pmTimeIn: item.pmTimeIn,
      pmTimeOut: item.pmTimeOut,
      lateMinutes: item.lateMinutes,
      undertimeMinutes: item.undertimeMinutes,
      regularDays: data.attendanceData.regularDays,
    };
  });
  const inserts = timeCardData.map((item) =>
    prisma.receipt.create({
      data: item,
    })
  );
  const createdTimeCards = await prisma.$transaction(inserts);
  if (!createdTimeCards.length) {
    return {
      count: 0,
    };
  }
  if (createdTimeCards.length) {
    const updatedTimeCard = await prisma.timeCard.update({
      where: {
        id: timeCardId,
      },
      data: {
        receipts: {
          set: createdTimeCards.map((item) => {
            return {
              id: item.id,
            };
          }),
        },
      },
    });
    console.log(updatedTimeCard);
    return updatedTimeCard;
  }

  // console.log(createdReceipt);

  // await models.addModel(res, req.body, prisma.receipt);
});
