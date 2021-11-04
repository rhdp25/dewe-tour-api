const { user } = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const scheme = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(8).required(),
    address: Joi.string().min(10).required(),
    gender: Joi.string().min(4).required(),
  });

  const { error } = scheme.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      ...req.body,
      password: hashedPassword,
      photo: "default.jpg",
      role: "user",
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.TOKEN_KEY);

    res.send({
      status: "success",
      message: "User has successfully created",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  const scheme = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = scheme.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userExist) {
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Credential is invalid",
      });
    }

    const token = jwt.sign({ id: userExist.id, role: userExist.role }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
