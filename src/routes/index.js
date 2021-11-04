const { Router } = require("express");
const router = Router();

const { register, login } = require("../controllers/auth");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { addCountry, getCountries, getCountry, updateCountry, deleteCountry } = require("../controllers/country");
const { addTrip, getTrips, getTrip, updateTrip, deleteTrip } = require("../controllers/trip");
const { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } = require("../controllers/transaction");

const { auth } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

// router.post("/users", addUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

router.post("/countries", auth, addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.patch("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

router.post("/trips", auth, addTrip);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.patch("/trips/:id", updateTrip);
router.delete("/trips/:id", deleteTrip);

router.post("/transactions", addTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransaction);
router.patch("/transactions/:id", auth, updateTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);

module.exports = router;
