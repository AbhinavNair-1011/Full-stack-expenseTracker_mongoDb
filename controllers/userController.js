let { Users } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const { otp, Otp } = require("../models/otp");


let addUser = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let password = req.body.password;
  try {
    let hash = await bcrypt.hash(password, 10);

    let user = new Users(name, email, phoneNumber, hash, false);

    await user.addUser();

    return res.status(200).json({
      status: "successfull",
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "user already exists",
        errorName: err.name,
        errorType: err.errors[0].path,
        errorValue: err.errors[0].value,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        errorMsg: err,
      });
    }
  }
};





let validateUser = async (req, res, next) => {
  console.log(req.body)
  Users.validateUser(req.body)
    .then((result) => {
      if (result) {
        console.log(result)
        bcrypt.compare(
          req.body.password,
          result.password,
          (err, authorization) => {
            if (err) {
              return "error";
            } else {
              if (authorization === true) {
                const token = jwt.sign(
                  {
                    userName: result.name,
                    userEmail: result.email,
                    userId:result._id
                  },
                  "secret121fs"
                );

                return res.status(200).json({
                  status: "successfull",
                  user: "found",
                  authentication: true,
                  token: token,
                });
              } else {
                return res.status(200).json({
                  status: "successfull",
                  data: result.email,
                  user: "found",
                  authentication: false,
                });
              }
            }
          }
        );
      } else {
        return res.status(404).json({
          status: "failed",
          data: result,
          user: "not found",
        });
      }
    })
    .catch((err) => console.log(err));
};


// let forgotPassword = async (req, res, next) => {
//   try {
//     let result = await Users.forgotPassword(req.body.email);
//     if(result==="no user found"){
//         return res.json({
//             status:"failed",
//             errorMsg:"no user found"
//         })
//     }else{
//         return res.json({ status:"successfull" });

//     }
   
//   } catch (err) {
//     return res.status(404).json(err);
//   }
// };

// let updateUserPassword=async(req,res,next)=>{
//     let email=req.body.email;
//     let password=req.body.password;

    
//         try{
            
//            let hash= await bcrypt.hash(password,10);

//           await Users.updatePassword(email,hash);
//           return res.json({status:"successfull"})


//         }catch(err){
//             return res.json({
//                 status:"failed",
//                 errorMsg:err
//         })
//         }
//  }


// let verifyOtp = async (req, res, next) => {
  
//   try {
//     let email = req.body.email;
//     let userOtp = Number(req.body.otp);

//     let result = await Otp.verifyOtp(email);

//     let generatedOtp = result.dataValues.otp;
    

//     if (generatedOtp === userOtp) {
//         await result.destroy();

//      return  res.status(200).json({
//         status:"successfull"
//       });
    
//     } else {
      
//       return res.json({
//         status:"failed"
//       })
//     }
//   } catch (err) {
//     await result.destroy();
//     return res.status(404).json({
//         staus:"failed",
//         errorMsg:err
//     })
//   }
// };
let validateMembership = async (req, res, next) => {
  try {
    let email = req.userDetails.userEmail;
    let result = await Users.validateMembership(email);

    if (result.isPremiumMember) {
      return res.json({
        status: "successfull",
        isPremiumMember: true,
      });
    } else {
      return res.json({
        status: "successfull",
        isPremiumMember: false,
      });
    }
  } catch (err) {
    return res.json({
      status: "failed",
      error: err,
    });
  }
};




module.exports = {
  addUser,
  validateUser,
  // forgotPassword,
  // updateUserPassword,
  // verifyOtp,
  validateMembership
};
