const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { addCountry, getCountries, getCountry, updateCountry, deleteCountry } = require("../controllers/country");
const { addTrip, getTrips, getTrip, updateTrip, deleteTrip } = require("../controllers/trip");
const { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } = require("../controllers/transaction");

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/users", addUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/countries", addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.patch("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

router.post("/trips", addTrip);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.patch("/trips/:id", updateTrip);
router.delete("/trips/:id", deleteTrip);

router.post("/transactions", addTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransaction);
router.patch("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
