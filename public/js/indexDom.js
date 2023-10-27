async function addUser(userDetails) {
  return await axios.post("http://localhost:3000/api/add-user", userDetails);
}
async function validateUser(userDetails) {
  return await axios.post(
    "http://localhost:3000/api/validate-user",
    userDetails
  );
}
async function forgotPassword(email) {
  return await axios.post("http://localhost:3000/api/forgot-password", email);
}
async function verifyOtp(details) {
  return await axios.post("http://localhost:3000/api/verify-otp", details);
}
async function updateUserPassword(details) {
  return await axios.post("http://localhost:3000/api/update-password", details);
}

window.addEventListener("DOMContentLoaded", () => {
  // sessionStorage.removeItem("loggedin");

  let registerForm = document.querySelector("#registerForm");
  let registerBtn = document.querySelector("#register");

  let loginForm = document.querySelector("#loginForm");
  let loginBtn = document.querySelector("#login");

  let registerShift = document.querySelector("#registerShift");
  registerShift.style.textDecoration = "underline";
  registerShift.style.textDecorationColor = "black";

  let loginShift = document.querySelector("#loginShift");

  let loginEmail = document.querySelector("#loginEmail");
  let loginPassword = document.querySelector("#loginPassword");

  let forgotPasswordForm = document.querySelector("#forgotPasswordForm");
  let forgotPasswordSubmit = document.querySelector("#forgot");

  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let phoneNumber = document.querySelector("#phoneNumber");
  let password = document.querySelector("#password");

  let forgotPasswordEmail = document.querySelector("#forgotPasswordEmail");
  let forgotPasswordOtp = document.querySelector("#forgotPasswordOtp");
  let forgotPasswordNew = document.querySelector("#forgotPasswordNew");
  let forgotPasswordNewConfirm = document.querySelector(
    "#forgotPasswordNewConfirm"
  );

  let cancelButton = document.createElement("button");

    name.value = "";
    email.value = "";
    password.value = "";
    phoneNumber.value = "";
    loginEmail.setAttribute("autocomplete","off")
    loginPassword.value = "";
  
    forgotPasswordEmail.value = "";
    forgotPasswordOtp.value = "";
    forgotPasswordNew.value = "";
    forgotPasswordNewConfirm.value = "";
  

  

  
    loginPassword.value = "";
    loginEmail.value = "";


    loginForm.style.zIndex = 1;
    registerForm.style.opacity = 0;
    loginForm.style.opacity = 1;

    forgotPasswordForm.style.opacity = 0;
    forgotPasswordForm.style.zIndex = 0;
    registerShift.style.textDecoration = "none";
    loginShift.style.textDecoration = "underline";
    loginShift.style.textDecorationColor = "black";
    registerForm.style.transition = "opacity 0s ease-in";
  

  registerShift.addEventListener("click", (e) => {
    e.preventDefault();
    clearLoginWarning();
    let cbtn = document.querySelector("#cancelOtp");
    if (cbtn) {
      cbtn.style.display = "none";
    }
    registerShift.style.textDecoration = "underline";
    loginShift.style.textDecoration = "none";
    registerShift.style.textDecorationColor = "black";
    registerForm.style.opacity = 1;
    loginForm.style.opacity = 0;
    forgotPasswordForm.style.opacity = 0;
    forgotPasswordForm.style.zIndex = 0;

    loginForm.style.zIndex = 0;
    registerForm.style.transition = "opacity 0.2s ease-in";
    name.value = "";
    email.value = "";
    password.value = "";
    phoneNumber.value = "";
    loginEmail.value = "";
    loginPassword.value = "";

    forgotPasswordEmail.value = "";
    forgotPasswordOtp.value = "";
    forgotPasswordNew.value = "";
    forgotPasswordNewConfirm.value = "";
    forgotPasswordEmail.removeAttribute("disabled");

    if (name.value || email.value || phoneNumber.value || password.value) {
      if (name.value) {
        if (
          name.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
          registerForm.removeChild(name.parentElement.nextElementSibling);
        }
      }
      if (email.value) {
        if (
          email.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
          registerForm.removeChild(email.parentElement.nextElementSibling);
        }
      }
      if (phoneNumber.value) {
        if (
          phoneNumber.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
          registerForm.removeChild(
            phoneNumber.parentElement.nextElementSibling
          );
        }
      }
      if (password.value) {
        if (
          password.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
          registerForm.removeChild(password.parentElement.nextElementSibling);
        }
      }
    }
  });
  loginShift.addEventListener("click", (e) => {
    e.preventDefault();
    clearRegisterWarning(name, email, phoneNumber, password);
    let cbtn = document.querySelector("#cancelOtp");
    if (cbtn) {
      cbtn.style.display = "none";
    }

    registerShift.style.textDecoration = "none";
    loginShift.style.textDecoration = "underline";
    loginShift.style.textDecorationColor = "black";
    forgotPasswordForm.style.opacity = 0;
    forgotPasswordForm.style.zIndex = 0;
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    setTimeout(() => {
      loginForm.style.zIndex = 1;
    }, 134);

    name.value = "";
    email.value = "";
    password.value = "";
    phoneNumber.value = "";
    loginEmail.value = "";
    loginPassword.value = "";

    forgotPasswordEmail.value = "";
    forgotPasswordOtp.value = "";
    forgotPasswordNew.value = "";
    forgotPasswordNewConfirm.value = "";
    forgotPasswordEmail.removeAttribute("disabled");
  });

  let userDetails = {
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
  };

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (name.value && email.value && phoneNumber.value && password.value) {
      userDetails.name = name.value;
      userDetails.email = email.value;
      userDetails.phoneNumber = phoneNumber.value;
      userDetails.password = password.value;

      addUser(userDetails)
        .then((result) => {
          name.value = "";
          email.value = "";
          phoneNumber.value = "";
          password.value = "";

          loginEmail.value = "";
          loginPassword = "";

          registerShift.style.textDecoration = "none";
          loginShift.style.textDecoration = "underline";
          loginShift.style.textDecorationColor = "black";
          registerForm.style.opacity = 0;
          loginForm.style.opacity = 1;
          setTimeout(() => {
            loginForm.style.zIndex = 1;
          }, 420);
        })
        .catch((err) => {
          if (
            err.response.data.errorName === "SequelizeUniqueConstraintError"
          ) {
            if (err.response.data.errorType === "email") {
              let p = document.createElement("p");
              p.innerHTML = `* ${err.response.data.errorValue} already exists`;
              p.setAttribute("class", "duplicateEntry");
              registerForm.insertBefore(
                p,
                email.parentElement.nextElementSibling
              );
              email.value = "";
            } else if (err.response.data.errorType === "phoneNumber") {
              let p = document.createElement("p");
              p.innerHTML = `*PhoneNumber : ${err.response.data.errorValue} already exists`;
              p.setAttribute("class", "duplicateEntry");
              registerForm.insertBefore(
                p,
                phoneNumber.parentElement.nextElementSibling
              );
              phoneNumber.value = "";
            }
          }
        });
    } else if (
      !name.value ||
      !email.value ||
      !phoneNumber.value ||
      !password.value
    ) {
      if (!name.value) {
        if (
          name.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*Name required";
          registerForm.insertBefore(p, email.parentElement);
        }
      }
      if (!email.value) {
        if (
          email.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*Email required";
          registerForm.insertBefore(p, phoneNumber.parentElement);
        }
      }
      if (!phoneNumber.value) {
        if (
          phoneNumber.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*PhoneNumber required";
          registerForm.insertBefore(p, password.parentElement);
        }
      }
      if (!password.value) {
        if (
          password.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*Password required";
          registerForm.insertBefore(p, registerBtn.parentElement);
        }
      }
    }
    if (name.value || email.value || phoneNumber.value || password.value) {
      if (name.value) {
        if (
          name.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
          registerForm.removeChild(name.parentElement.nextElementSibling);
        }
      }
      if (email.value) {
        if (
          email.parentElement.nextElementSibling.className === "duplicateEntry"
        ) {
          registerForm.removeChild(email.parentElement.nextElementSibling);
        }
      }
      if (phoneNumber.value) {
        if (
          phoneNumber.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
          registerForm.removeChild(
            phoneNumber.parentElement.nextElementSibling
          );
        }
      }
      if (password.value) {
        if (
          password.parentElement.nextElementSibling.className ===
          "duplicateEntry"
        ) {
          registerForm.removeChild(password.parentElement.nextElementSibling);
        }
      }
    }
  });

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let loginEmail = document.querySelector("#loginEmail");
    let loginPassword = document.querySelector("#loginPassword");
    let userDetails = {};

    if (loginEmail.value && loginPassword.value) {
      userDetails.email = loginEmail.value;
      userDetails.password = loginPassword.value;

      validateUser(userDetails)
        .then((result) => {
          if (result.data.authentication === true) {
            localStorage.setItem("token", result.data.token);
            sessionStorage.setItem("loggedin", true);
            window.location.href = "../../views/mainPage.html";
          } else if (result.data.authentication === false) {
            if (
              loginEmail.parentElement.nextElementSibling.className ===
              "loginDuplicateEntry"
            ) {
            } else {
              let p = document.createElement("p");
              p.setAttribute("class", "loginDuplicateEntry");
              p.innerHTML = "*Incorrect password";
              loginForm.insertBefore(
                p,
                loginPassword.parentElement.nextElementSibling
              );
              loginPassword.value = "";
            }
          }
        })
        .catch((err) => {
          if (err.response.data.user === "not found") {
            if (
              loginEmail.parentElement.nextElementSibling.className ===
              "loginDuplicateEntry"
            ) {
            } else {
              let p = document.createElement("p");
              p.setAttribute("class", "loginDuplicateEntry");
              p.innerHTML = "*User not found";
              loginForm.insertBefore(p, loginPassword.parentElement);
            }
          }
        });
    }
    if (!loginEmail.value || !loginPassword.value) {
      if (!loginEmail.value) {
        if (
          loginEmail.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          loginForm.removeChild(loginEmail.parentElement.nextElementSibling);
        }
        let p = document.createElement("p");
        p.setAttribute("class", "loginDuplicateEntry");
        p.innerHTML = "*Email required";
        loginForm.insertBefore(p, loginPassword.parentElement);
      }
      if (!loginPassword.value) {
        if (
          loginPassword.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          loginForm.removeChild(loginPassword.parentElement.nextElementSibling);
        }
        let p = document.createElement("p");
        p.setAttribute("class", "loginDuplicateEntry");
        p.innerHTML = "*Password required";
        loginForm.insertBefore(
          p,
          loginPassword.parentElement.nextElementSibling
        );
      }
    }

    if (loginEmail.value || loginPassword.value) {
      if (loginEmail.value) {
        if (
          loginEmail.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          loginForm.removeChild(loginEmail.parentElement.nextElementSibling);
        }
      }
      if (loginPassword.value) {
        if (
          loginPassword.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          loginForm.removeChild(loginPassword.parentElement.nextElementSibling);
        }
      }
    }
  });

  let forgotPasswordBtn = document.querySelector("#forgotPassword");

  forgotPasswordBtn.addEventListener("click", (e) => {
    clearRegisterWarning(name, email, phoneNumber, password);
    clearLoginWarning();

    forgotPasswordSubmit.value = "Send otp in Email";

    loginEmail.value = "";
    loginPassword.value = "";
    let forgotPasswordOtpWrap = document.querySelector(
      "#forgotPasswordOtpWrap"
    );
    let forgotPasswordNewWrap = document.querySelector(
      "#forgotPasswordNewWrap"
    );
    let forgotPasswordNewConfirmWrap = document.querySelector(
      "#forgotPasswordNewConfirmWrap"
    );
    let forgotPasswordEmailWrap = document.querySelector(
      "#ForgotPasswordEmailWrap"
    );

    forgotPasswordOtpWrap.style.display = "none";
    forgotPasswordNewWrap.style.display = "none";
    forgotPasswordNewConfirmWrap.style.display = "none";

    forgotPasswordForm.style.opacity = 1;
    forgotPasswordForm.style.zIndex = 2;
    registerForm.style.opacity = 0;
    loginForm.style.opacity = 0;
  });

  forgotPasswordSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    if (forgotPasswordSubmit.value === "Send otp in Email") {
      if (forgotPasswordEmail.value) {
        let email = { email: forgotPasswordEmail.value };
        let cbtn = document.querySelector("#cancelOtp");
        if (cbtn) {
          cbtn.style.display = "initial";
        }

        if (
          forgotPasswordEmail.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          forgotPasswordForm.removeChild(
            forgotPasswordEmail.parentElement.nextElementSibling
          );
        }

        forgotPassword(email)
          .then((result) => {
            if (result.data.errorMsg === "no user found") {
              forgotPasswordOtpWrap.style.display = "none";

              if (
                forgotPasswordEmail.parentElement.nextElementSibling
                  .className === "loginDuplicateEntry"
              ) {
              } else {
                let p = document.createElement("p");
                p.setAttribute("class", "loginDuplicateEntry");
                p.innerHTML = "*User not found";
                forgotPasswordForm.insertBefore(
                  p,
                  forgotPasswordEmail.parentElement.nextElementSibling
                );
              }
            } else {
              let forgotPasswordWrap = document.querySelector(
                "#forgotPasswordWrap"
              );

              cancelButton.innerText = "Resend otp";
              cancelButton.setAttribute("id", "cancelOtp");

              forgotPasswordWrap.appendChild(cancelButton);

              forgotPasswordEmail.setAttribute("disabled", "");
              forgotPasswordOtpWrap.style.display = "flex";
              forgotPasswordSubmit.value = "Submit otp";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (
          forgotPasswordEmail.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "loginDuplicateEntry");
          p.innerHTML = "*Email required";
          forgotPasswordForm.insertBefore(
            p,
            forgotPasswordEmail.parentElement.nextElementSibling
          );
        }
      }
    } else if (forgotPasswordSubmit.value === "Submit otp") {
      if (forgotPasswordOtp.value) {
        if (
          forgotPasswordOtp.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          forgotPasswordForm.removeChild(
            forgotPasswordOtp.parentElement.nextElementSibling
          );
        }
        let details = {
          email: forgotPasswordEmail.value,
          otp: forgotPasswordOtp.value,
        };

        verifyOtp(details)
          .then((result) => {
            if (result.data.status === "successfull") {
              if (
                forgotPasswordOtp.parentElement.nextElementSibling.className ===
                "loginDuplicateEntry"
              ) {
                forgotPasswordForm.removeChild(
                  forgotPasswordOtp.parentElement.nextElementSibling
                );
              }
              forgotPasswordOtpWrap.style.display = "none";
              forgotPasswordNewWrap.style.display = "flex";
              forgotPasswordNewConfirmWrap.style.display = "flex";
              forgotPasswordNewConfirm.value = "";
              cancelButton.parentElement.removeChild(cancelButton);
              forgotPasswordSubmit.value = "Reset Password";

              forgotPasswordOtp.value = "";
              forgotPasswordNew.value = "";
              forgotPasswordNewConfirm.value = "";
            } else if (result.data.status === "failed") {
              if (
                forgotPasswordOtp.parentElement.nextElementSibling.className ===
                "loginDuplicateEntry"
              ) {
                forgotPasswordForm.removeChild(
                  forgotPasswordOtp.parentElement.nextElementSibling
                );
              }
              let p = document.createElement("p");
              p.setAttribute("class", "loginDuplicateEntry");
              p.innerHTML = "*Invalid otp";
              forgotPasswordForm.insertBefore(
                p,
                forgotPasswordOtp.parentElement.nextElementSibling
              );
              forgotPasswordOtp.value = "";
            }
          })
          .catch((err) => {});
      } else {
        if (
          forgotPasswordOtp.parentElement.nextElementSibling.className ===
          "loginDuplicateEntry"
        ) {
          forgotPasswordForm.removeChild(
            forgotPasswordOtp.parentElement.nextElementSibling
          );
        }
        let p = document.createElement("p");
        p.setAttribute("class", "loginDuplicateEntry");
        p.innerHTML = "*Otp required";
        forgotPasswordForm.insertBefore(
          p,
          forgotPasswordOtp.parentElement.nextElementSibling
        );

        forgotPasswordOtp.value = "";
      }
    } else if (forgotPasswordSubmit.value === "Reset Password") {
      if (forgotPasswordNew.value && forgotPasswordNewConfirm.value) {
        if (forgotPasswordNew.value === forgotPasswordNewConfirm.value) {
          let email = forgotPasswordEmail.value;
          let password = forgotPasswordNew.value;

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

          let details = { email, password };
          updateUserPassword(details)
            .then((result) => {
              forgotPasswordNewConfirm.value = "";
              forgotPasswordNew.value = "";
              forgotPasswordNewConfirm.value = "";
              forgotPasswordOtp.value = "";
              forgotPasswordEmail.value = "";
              forgotPasswordEmail.removeAttribute("disabled");

              loginForm.style.opacity = "1";
              loginForm.style.zIndex = "1";
              forgotPasswordForm.style.opacity = "0";
              forgotPasswordForm.style.zIndex = "0";
            })
            .catch((err) => {});
        } else {
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
          let p = document.createElement("p");
          p.setAttribute("class", "loginDuplicateEntry");
          p.innerHTML = "*Password does not match";
          forgotPasswordForm.insertBefore(
            p,
            forgotPasswordNew.parentElement.nextElementSibling
          );
          forgotPasswordForm.insertBefore(
            p,
            forgotPasswordNewConfirm.parentElement.nextElementSibling
          );
          forgotPasswordNewConfirm.value = "";
          forgotPasswordNew.value = "";
        }
      } else if (!forgotPasswordNew.value || !forgotPasswordNewConfirm.value) {
        if (forgotPasswordNewConfirm.value) {
          if (
            forgotPasswordNewConfirm.parentElement.nextElementSibling
              .className === "loginDuplicateEntry"
          ) {
            forgotPasswordForm.removeChild(
              forgotPasswordNewConfirm.parentElement.nextElementSibling
            );
          }
        }
        if (forgotPasswordNew.value) {
          if (
            forgotPasswordNew.parentElement.nextElementSibling.className ===
            "loginDuplicateEntry"
          ) {
            forgotPasswordForm.removeChild(
              forgotPasswordNew.parentElement.nextElementSibling
            );
          }
        }
        if (!forgotPasswordNew.value) {
          if (
            forgotPasswordNew.parentElement.nextElementSibling.className ===
            "loginDuplicateEntry"
          ) {
            forgotPasswordForm.removeChild(
              forgotPasswordNew.parentElement.nextElementSibling
            );
          }
          let p = document.createElement("p");
          p.setAttribute("class", "loginDuplicateEntry");
          p.innerHTML = "*Password required";
          forgotPasswordForm.insertBefore(
            p,
            forgotPasswordNew.parentElement.nextElementSibling
          );
        }
        if (!forgotPasswordNewConfirm.value) {
          if (
            forgotPasswordNewConfirm.parentElement.nextElementSibling
              .className === "loginDuplicateEntry"
          ) {
            forgotPasswordForm.removeChild(
              forgotPasswordNewConfirm.parentElement.nextElementSibling
            );
          }
          let p = document.createElement("p");
          p.setAttribute("class", "loginDuplicateEntry");
          p.innerHTML = "*Password required";
          forgotPasswordForm.insertBefore(
            p,
            forgotPasswordNewConfirm.parentElement.nextElementSibling
          );
        }
      }
    }
  });
  let resendOtpCount = 0;

  cancelButton.addEventListener("click", (e) => {
    resendOtpCount++;
    e.preventDefault();
    if (resendOtpCount === 1) {
      if (
        forgotPasswordOtp.parentElement.nextElementSibling.className ===
        "loginDuplicateEntry"
      ) {
        forgotPasswordForm.removeChild(
          forgotPasswordOtp.parentElement.nextElementSibling
        );
      }
      let p = document.createElement("p");
      p.setAttribute("class", "loginDuplicateEntry");
      p.innerHTML = "*Otp resent";
      forgotPasswordForm.insertBefore(
        p,
        forgotPasswordOtp.parentElement.nextElementSibling
      );
    } else if (resendOtpCount === 2) {
      if (
        forgotPasswordOtp.parentElement.nextElementSibling.className ===
        "loginDuplicateEntry"
      ) {
        forgotPasswordForm.removeChild(
          forgotPasswordOtp.parentElement.nextElementSibling
        );
      }
      let p = document.createElement("p");
      p.setAttribute("class", "loginDuplicateEntry");
      p.innerHTML = "Resent,Please wait and check your mail";
      forgotPasswordForm.insertBefore(
        p,
        forgotPasswordOtp.parentElement.nextElementSibling
      );
    }

    if (resendOtpCount === 3) {
      let btn = document.querySelector("#cancelOtp");
      btn.parentElement.removeChild(btn);

      if (
        forgotPasswordOtp.parentElement.nextElementSibling.className ===
        "loginDuplicateEntry"
      ) {
        forgotPasswordForm.removeChild(
          forgotPasswordOtp.parentElement.nextElementSibling
        );
      }
      let p = document.createElement("p");
      p.setAttribute("class", "loginDuplicateEntry");
      p.innerHTML = "*Please try again later";
      forgotPasswordForm.insertBefore(
        p,
        forgotPasswordOtp.parentElement.nextElementSibling
      );
      // e.target.parentElement.removeChild(e.target)
    }

    forgotPassword({ email: forgotPasswordEmail.value })
      .then((res) => {})
      .then((err) => {});
  });
});
