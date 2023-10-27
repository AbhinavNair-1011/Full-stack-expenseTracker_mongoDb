// const sequelize=require("../database/connection");
// const Sequelize=require("sequelize");
// const {users,Users}=require("./users")
// const{DataTypes}=require("sequelize")


// const otp=sequelize.define("otp",{
//     id:{
//         type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//         primaryKey:true
//     },
//     otp:{
//         type:Sequelize.INTEGER,
//         notNull:true
//     },
//     userEmail:{
//         type:Sequelize.STRING,
//         nutNull:true
//     }
// });

// class Otp{
//     constructor(email,otp){
//         this.email=email
//         this.otp=otp 
//     }
//     async insertIntoDatabase(){
//         let t=await sequelize.transaction();
//         try{
//             let user=await otp.findAll({where:{
//                 userEmail:this.email
//             }})
           
//             if(user){
          
//                 await otp.destroy({where:{
//                     userEmail:this.email
//                 }});
//                 let createdOtp=await otp.create({
//                     userEmail:this.email,
//                      otp:this.otp     
//                  },{transaction:t});
//                  t.commit()
//                  return createdOtp;
    
//             }else{
                
//                 let createdOtp= await otp.create({
//                     userEmail:this.email,
//                      otp:this.otp
    
//                  },{transaction:t});
//                  t.commit()
//                  return createdOtp;
//             }

//         }catch(err){
//             t.rollback();
//             return err;
//         }

       
    
       
        
//     }
//     static verifyOtp(userEmail){
//        return otp.findOne({where:{
// userEmail:userEmail
//        }})
//     }
// }

// module.exports={otp,Otp};
