const  mongoose=require("mongoose")
const dotenv = require("dotenv").config();
const { otp, Otp } = require("./otp");
const sendResetEmail=require("../services/sendInBlue")

const schema= mongoose.Schema;

const userSchema= new schema({

  name: {
    type: String
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type:String
  },
  password: {
    type:String
  },
  isPremiumMember: {
    type: String
  }
})

let users=mongoose.model("user",userSchema);


class Users {
  constructor(name, email, phoneNumber, password, isPremiumMember) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isPremiumMember = isPremiumMember;
  }
  async addUser() {
     return await users.create({
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        isPremiumMember: this.isPremiumMember,
      });
     
  }

  static async validateUser(userDetails) {

    try {
      return await users.findOne({ email: userDetails.email  });
    } catch (err) {
      console.log(err)
      return err;
    }
  }
  static async validateMembership(email) {
    try {
      return await users.findOne( { email: email });
    } catch (err) {
      return err;
    }
  }

  // static async forgotPassword(userEmail) {
  //   try {
  //     let user = await user.findOne({
  //       where: {
  //         email: userEmail,
  //       },
  //     });
  //     if (user) {
  //       let generatedOtp = Math.floor(
  //         Math.random() * ((999999-100000 ) + 1) + 100000
  //       );
   
  //      let messageId= await sendResetEmail(generatedOtp,userEmail);
     
  //       let obj = new Otp(userEmail, generatedOtp);
        
  //       return await obj.insertIntoDatabase();
  //     }
  //     if(!user){
  //       return "no user found"
  //     }
  //   } catch (err) {
  //     return err;
  //   }
  // }
  // static async updatePassword(email,password){
  //   try{

  //     let user= await users.findOne({where:{
  //       email:email
  //     }})

  //     await user.update({
  //       password:password
  //     })

  //   }catch(err){
  //     return err
  //   }
  //   }
    
}
module.exports = { Users,users };
