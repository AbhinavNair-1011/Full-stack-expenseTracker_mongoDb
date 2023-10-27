
// const Sib = require("sib-api-v3-sdk");


// async function sendResetEmail(generatedOtp,userEmail){

//     const client = Sib.ApiClient.instance;
// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.sib_key;

// const transacEmailApi = new Sib.TransactionalEmailsApi();

// const details = {
//   sender: {
//     email: "abhivish1011@gmail.com",
//     name: "Expense Tracker",
//   },
//   to: [{ email: userEmail }],
//   subject: "Forgot password",
//   TextContent: `Your OTP for resetting the password is ${generatedOtp}`,
// };
// return transacEmailApi.sendTransacEmail(details);
// }

// module.exports=sendResetEmail;