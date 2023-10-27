const controller = require("../controllers/userController");
const paymentController=require("../controllers/paymentController")
const router = require("express").Router();
const jwtVerify=require("../middlewares/jwt")

router.post("/api/add-user", controller.addUser);
// router.post("/api/update-password", controller.updateUserPassword);
// router.post("/api/forgot-password", controller.forgotPassword);
router.post("/api/validate-user", controller.validateUser);
// router.post("/api/verify-otp",controller.verifyOtp);
// router.post("/api/buy-membership/validate-membership",jwtVerify,controller.validateMembership);

// router.post("/api/buy-membership/create-order", paymentController.createOrder);
// router.post("/api/buy-membership/payment",jwtVerify,paymentController.paymentDetails);



module.exports = router;
