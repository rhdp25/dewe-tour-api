const { user } = require("../../models");

// exports.addUser = async (req, res) => {
//   try {
//     const data = await user.create(req.body, {
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//     });
//     res.send({
//       status: "success",
//       message: "Add user successfuly",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "Server Error!",
//     });
//   }
// };

exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Get all user successfuly",
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

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "Get user successfuly",
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

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await user.update(req.body, {
      where: {
        id,
      },
    });

    const updateData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Update user successfuly",
      data: {
        user: updateData,
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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Delete user successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};
