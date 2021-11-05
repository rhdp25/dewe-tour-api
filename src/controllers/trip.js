const fs = require("fs");
const path = require("path");
const { trip, country } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const allTrip = await trip.findAll();
    const tripExist = allTrip.find((item) => req.body.title === item.title);

    const { image } = req.files;
    const allImage = [];
    for (let item of image) {
      allImage.push(item.filename);
    }

    const imageToString = JSON.stringify(allImage);

    if (tripExist) {
      return res.status(400).send({
        status: "failed",
        message: "Trip name already exist",
      });
    }

    const data = await trip.create(
      { ...req.body, image: imageToString },
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    );

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

    let dataImage = [];

    res.send({
      status: "success",
      message: "Get all trip successfuly",
      data: data.map((item) => {
        const itemValue = JSON.parse(item.image);

        const newData = [];
        for (let i = 0; i < itemValue.length; i++) {
          newData.push(`${process.env.PATH_FILE}${itemValue[i]}`);
        }

        dataImage = newData;

        item.image = dataImage;
        return item;
      }),
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

    const { accomodation, countryId, dateTrip, day, description, eat, image, night, price, quota, title, transportation } = data;

    const dataImage = JSON.parse(image);
    const newDataImage = [];
    for (let i = 0; i < dataImage.length; i++) {
      newDataImage.push(`${process.env.PATH_FILE}${dataImage[i]}`);
    }

    res.send({
      status: "success",
      message: "Get trip successfuly",
      data: {
        accomodation,
        countryId,
        dateTrip,
        day,
        description,
        eat,
        image: newDataImage,
        night,
        price,
        quota,
        title,
        transportation,
        country: data.country,
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

exports.updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const { image } = req.files;

    const dataImage = [];

    image.map((item) => {
      dataImage.push(item.filename);
    });

    await trip.update(
      {
        image: JSON.stringify(dataImage),
      },
      {
        where: {
          id,
        },
      }
    );

    // const updateData = await trip.findOne({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     model: country,
    //     as: "country",
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt"],
    //     },
    //   },
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt", "countryId"],
    //   },
    // });

    res.send({
      status: "success",
      message: "Update trip successfuly",
      data,
      // : {
      //   trip: updateData,
      // },
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
