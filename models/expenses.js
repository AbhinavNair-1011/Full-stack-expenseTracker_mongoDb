const {  Users,users } = require("../models/users");
const awsConnect=require("../services/aws");
const mongoose=require("mongoose");

const expenseSchema= new mongoose.Schema({
  expenseItem: {
    type: String
  },
  expensePrice: {
    type: Number
  },
  userId:{
    type:mongoose.Types.ObjectId
  },
  createdAt:{
type: Date
  } 
})

const expenses=mongoose.model("expense", expenseSchema);

class Data {
  constructor(expenseItem, expensePrice, email) {
    this.item = expenseItem;
    this.price = expensePrice;
    this.email = email;
  
  }
 

  static async fetchAll(email) {
    try {
      let user = await users.findOne({ email: email});
      let expense = await expenses.find({userId: user._id });
      return expense;
    } catch (err) {
      res.json({
        status: "failed",
        error: err,
      });
    }
  }
  async insertIntoDatabase() {
    try {
      let user = await users.findOne({
        
          email: this.email
        
      });
      console.log(user)
      let userId = user._id;
      
      let expense=await expenses.create({
        expenseItem: this.item.toUpperCase(),
        expensePrice: this.price,
        userId: userId,
        createdAt:Date.now()
      });
      return expense;
    } catch (err) {
      console.log(err)
      return err;
    }
  }

  static async updateData(data, userDetails) {
    try {
      let user = await users.findOne( { email: userDetails.userEmail});

      let id = user._id;

      let expense = await expenses.findOne({
          userId: id,
          expenseItem: data.currentExpenseItem.toLowerCase(),
          expensePrice: data.currentPrice,
        });
      if (data.todo === "onlyItemName") {
        expense.expenseItem=data.newExpenseItem.toLowerCase()
        await expense.save()
        return null
      } else if (data.todo === "onlyItemPrice") {
        expense.expensePrice=data.newExpensePrice
        await expense.save()

        return null
      } else if (data.todo === "itemName&itemPrice") {
        expense.expenseItem=data.newExpenseItem.toLowerCase();
        expense.expensePrice=data.newExpensePrice
        await expense.save()


        return null
      }
    } catch (err) {
      return err;
    }
  }

  static async deleteFromDatabase(name, email, price) {
    try {
      let user = await users.findOne({
        
          email: email,
        
      });
console.log(user, name,email,price)
      let id = user._id;
      return await expenses.deleteOne({
        
          userId: id,
          expenseItem: name.toUpperCase(),
          expensePrice: price,
       
      });
    } catch (err) {
      return err;
    }
  }

  // static async fetchLeaderboard() {
  //   try {
  //     return await users.findAll({
  //       attributes: [
  //         "id",
  //         "name",
  //         [
  //           sequelize.fn("sum", sequelize.col("expenses.expensePrice")),
  //           "totalAmount",
  //         ],
  //       ],
  //       include: [
  //         {
  //           model: expenses,
  //           attributes: [],
  //         },
  //       ],
  //       group: ["users.id"],
  //       order: [["totalAmount", "DESC"]],
  //     });
  //   } catch (err) {
  //     return err;
  //   }
  // }
  // static async downloadExpense(email, id) {
  //   try {
  //     let awsS3 = awsConnect();
  //     let result = await Data.fetchAll(email);
  //     let stringData = JSON.stringify(result);
  
  //     let options = {
  //       Bucket: "expensedownloadbucket",
  //       Key: `expense/${id}/${new Date().toISOString()}.txt`,
  //       Body: stringData,
  //       ACL:"public-read"
  //     };
  
  //     return new Promise((resolve, reject) => {
  //       awsS3.upload(options, (err, uploaded) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(uploaded);
  //         }
  //       });
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  
}

module.exports = { Data, expenses };
