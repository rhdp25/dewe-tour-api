const { transaction, user, trip, country } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = await transaction.create({
      counterQty: req.body.counterQty,
      total: req.body.total,
      status: req.body.status,
      tripId: req.body.tripId,
      userId: req.user.id,
      attachment: req.body.attachment,
    });

    if (newTransaction) {
      let data = await transaction.findOne({
        where: {
          id: newTransaction.id,
        },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: trip,
            as: "trip",
            include: {
              model: country,
              as: "country",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "countryId"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      });

      data = JSON.parse(JSON.stringify(data));

      res.send({
        status: "success",
        message: "Add transaction successfuly",
        data: {
          data,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error!",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const token = req.user;

    const transactions = await transaction.findAll({
      where: {
        status: "Waiting Payment",
        userId: req.user.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      token,
    });

    res.send({
      status: "success",
      message: "Get all transaction successfuly",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getHistoryTrip = async (req, res) => {
  try {
    const token = req.user;

    const transactions = await transaction.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      token,
    });

    res.send({
      status: "success",
      message: "Get history trip successfuly",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getIncomeTransaction = async (req, res) => {
  try {
    const { idUser } = req.user;

    const transactions = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      idUser,
    });

    res.send({
      status: "success",
      message: "Get incoming transaction successfuly",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { idUser } = req.user;
    const { id } = req.params;
    const data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      idUser,
    });

    res.send({
      status: "success",
      data,
      attachment: process.env.PATH_ATTACHMENT + data.attachment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.update(
      {
        status: req.body.status,
        attachment: req.files.attachment[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success",
      message: `Update id: ${id} finished`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateIncomingTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.user;

    await transaction.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id,
        },
      },
      token
    );

    const data = await transaction.findOne({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: trip,
          as: "trip",
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success",
      message: "Edit transaction success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { idUser } = req.user;
  const { id } = req.params;

  try {
    await transaction.destroy({
      where: {
        id,
      },
      idUser,
    });

    const data = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Delete transaction successfuly",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};
