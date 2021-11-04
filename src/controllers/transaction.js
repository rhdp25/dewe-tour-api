const { transaction, user, trip, country } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const data = await transaction.create(req.body, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Add transaction successfuly",
      data,
    });
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
    const data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
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
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });

    res.send({
      status: "success",
      message: "Get all transaction successfuly",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error!",
    });
  }
};

exports.getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
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
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });

    res.send({
      status: "success",
      message: "Get transaction successfuly",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error!",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await transaction.update(req.body, {
      where: {
        id,
      },
    });

    const updateData = await transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
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
        exclude: ["createdAt", "updatedAt", "userId", "tripId"],
      },
    });

    res.send({
      status: "success",
      message: "Update transaction successfuly",
      data: {
        transaction: updateData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error!",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Delete transaction successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};
