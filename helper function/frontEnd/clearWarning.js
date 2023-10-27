

function clearLoginWarning(){
    if (
      loginEmail.parentElement.nextElementSibling.className ===
      "loginDuplicateEntry"
    ) {
      loginForm.removeChild(loginEmail.parentElement.nextElementSibling);
    }
   
  
    if (
      loginPassword.parentElement.nextElementSibling.className ===
      "loginDuplicateEntry"
    ) {
      loginForm.removeChild(loginPassword.parentElement.nextElementSibling);
      console.log("jijij");
    }
  }
  
  function clearRegisterWarning(name,email,phoneNumber,password){
    
  
      if (
        name.parentElement.nextElementSibling.className === "duplicateEntry"
      ) {
        registerForm.removeChild(name.parentElement.nextElementSibling);
      }
    
    
      if (
        email.parentElement.nextElementSibling.className === "duplicateEntry"
      ) {
        registerForm.removeChild(email.parentElement.nextElementSibling);
      }
    
   
      if (
        phoneNumber.parentElement.nextElementSibling.className ===
        "duplicateEntry"
      ) {
        registerForm.removeChild(
          phoneNumber.parentElement.nextElementSibling
        );
      }
    
  
      if (
        password.parentElement.nextElementSibling.className ===
        "duplicateEntry"
      ) {
        registerForm.removeChild(password.parentElement.nextElementSibling);
      }
    
      
        if (
          forgotPasswordNew.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          forgotPasswordForm.removeChild(
            forgotPasswordNew.parentElement.nextElementSibling
          );
        }
     
        if (
          forgotPasswordNewConfirm.parentElement.nextElementSibling
            .className === "loginDuplicateEntry"
        ) {
          forgotPasswordForm.removeChild(
            forgotPasswordNewConfirm.parentElement.nextElementSibling
          );
       
    }
  
  
      if (
        forgotPasswordOtp.parentElement.nextElementSibling.className ===
        "loginDuplicateEntry"
      ) {
        forgotPasswordForm.removeChild(
          forgotPasswordOtp.parentElement.nextElementSibling
        );
      }
      if (
        forgotPasswordEmail.parentElement.nextElementSibling.className ===
        "loginDuplicateEntry"
      ) {
        forgotPasswordForm.removeChild(
          forgotPasswordEmail.parentElement.nextElementSibling
        );
      }
      
    
  
  }
  // module.exports={clearLoginWarning,clearRegisterWarning};