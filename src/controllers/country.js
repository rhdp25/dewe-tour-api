const { country } = require("../../models");

exports.addCountry = async (req, res) => {
  try {
    const countryExist = await country.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (countryExist) {
      return res.status(400).send({
        status: "failed",
        message: "Country already exist",
      });
    }

    const data = await country.create(req.body, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Add country successfuly",
      data: {
        id: data.id,
        name: data.name,
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

exports.getCountries = async (req, res) => {
  try {
    const data = await country.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Get all country successfuly",
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

exports.getCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Get country successfuly",
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

exports.updateCountry = async (req, res) => {
  const { id } = req.params;

  try {
    await country.update(req.body, {
      where: {
        id,
      },
    });

    const updateData = await country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Update country successfuly",
      data: {
        country: updateData,
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

exports.deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    await country.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Delete country successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};
