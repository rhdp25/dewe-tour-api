const { Router } = require("express");
const router = Router();

const { register, login, checkAuth } = require("../controllers/auth");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { addCountry, getCountries, getCountry, updateCountry, deleteCountry } = require("../controllers/country");
const { addTrip, getTrips, getTrip, updateTrip, deleteTrip } = require("../controllers/trip");
const { addTransaction, getTransactions, updateTransaction, deleteTransaction, getTransactionById, getHistoryTrip, getIncomeTransaction, updateIncomingTransaction } = require("../controllers/transaction");

const { auth, adminOnly } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploadFile");
const { attachmentFile } = require("../middleware/attachment");

router.post("/register", register);
router.post("/login", login);

router.get("/users", adminOnly, getUsers);
router.get("/users/:id", adminOnly, getUser);
router.patch("/users/:id", auth, adminOnly, updateUser);
router.delete("/users/:id", auth, adminOnly, deleteUser);
router.get("/check-auth", auth, checkAuth);

router.post("/countries", auth, adminOnly, addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.patch("/countries/:id", auth, adminOnly, updateCountry);
router.delete("/countries/:id", auth, adminOnly, deleteCountry);

router.post("/trips", auth, adminOnly, uploadFile("image"), addTrip);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.patch("/trips/:id", auth, adminOnly, uploadFile("image"), updateTrip);
router.delete("/trips/:id", auth, adminOnly, deleteTrip);

router.post("/transactions", auth, addTransaction);
router.get("/transactions", auth, getTransactions);
router.get("/transactions/:id", auth, getTransactionById);
router.patch("/transactions/:id", auth, attachmentFile("attachment"), updateTransaction);

router.get("/history-trips", auth, getHistoryTrip);
router.get("/incoming-transactions", auth, getIncomeTransaction);
router.patch("incoming-transactions/:id", auth, adminOnly, updateIncomingTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);

module.exports = router;
