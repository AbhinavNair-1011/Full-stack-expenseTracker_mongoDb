// const sequelize = require("../database/connection");
// const Sequelize = require("sequelize");
// const { users, Users } = require("../models/users");
// const {DataTypes}=require("sequelize")


// const payments = sequelize.define("payments", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
  
//   },
//   orderId: Sequelize.STRING,
//   paymentId: Sequelize.STRING,
//   paymentSignature: Sequelize.STRING,
// });

// class Payments {
//   constructor(orderId, paymentId, paymentSignature) {
//     this.orderId = orderId;
//     this.paymentId = paymentId;
//     this.paymentSignature = paymentSignature;
//   }
//   async insertIntoDatabase(userEmail) {
//     let t=await sequelize.transaction();
//     try {
//       let user = await users.findOne({ where: { email: userEmail } });

//       let userId = user.dataValues.id;
//       let isPremiumMember = user.dataValues.isPremiumMember;

//       if (!isPremiumMember) {
//         let payment = await payments.create({
//           orderId: this.orderId,
//           paymentId: this.paymentId,
//           paymentSignature: this.paymentSignature,
//           userId: userId,
//         },{transaction:t})

//         let updatePremium= await user.update({
//           isPremiumMember: true,
//         },{transaction:t});
//         t.commit();
//         return updatePremium;
//       }
//     } catch (err) {
//       t.rollback();
//       return err;
//     }
//   }
// }
// module.exports = { payments, Payments };
