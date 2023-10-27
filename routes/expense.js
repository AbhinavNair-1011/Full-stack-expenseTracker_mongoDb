const router = require("express").Router();
const controller = require("../controllers/expenseController.js");
const jwtVerify = require("../middlewares/jwt.js");

router.get("/api/fetch-data", jwtVerify, controller.fetchData);
router.post("/api/add-data", jwtVerify, controller.addData);
router.patch("/api/update-data", jwtVerify, controller.updateData);
router.delete("/api/delete-data/:email/:itemName",jwtVerify,controller.deleteData);
// router.get("/api/fetch-leaderboard", controller.fetchLeaderboard);
// router.get("/api/download-expenses",jwtVerify,controller.downloadExpenses);
router.get("/api/expenses-pagination",jwtVerify,controller.expensesPagination);


module.exports = router;

