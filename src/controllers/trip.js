const { trip, country } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const data = await trip.create(req.body, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Add trip successfuly",
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

exports.getTrips = async (req, res) => {
  try {
    const data = await trip.findAll({
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
    });

    res.send({
      status: "success",
      message: "Get all trip successfuly",
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

exports.getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await trip.findOne({
      where: {
        id,
      },
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
    });

    res.send({
      status: "success",
      message: "Get trip successfuly",
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

exports.updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    await trip.update(req.body, {
      where: {
        id,
      },
    });

    const updateData = await trip.findOne({
      where: {
        id,
      },
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
    });

    res.send({
      status: "success",
      message: "Update trip successfuly",
      data: {
        trip: updateData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    await trip.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Delete trip successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};
