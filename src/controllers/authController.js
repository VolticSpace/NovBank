"use strict";
import { AuthManager } from "../services/AuthManager.js";
import { renderError, clearErrorMsg } from "../views/signupView.js";
import { validateSignup } from "../utils/formValidator.js";

const auth = new AuthManager();
const openAccountBtns = document.querySelectorAll(".open_acc_btn");

const signupLink = document.querySelector(".sign_suggestion");
const loginLink = document.querySelector(".login_suggestion");

const signupPage = document.querySelector(".signup_flex");
const loginPage = document.querySelector(".login_flex");

const signupNameInput = document.querySelector(".js_signup_name");

const signupEmailInput = document.querySelector(".js_signup_email");

const signupPhoneInput = document.querySelector(".js_signup_phone");

const signupPasswordInput = document.querySelector(".js_signup_password");

const confirmPasswordInput = document.querySelector(".js_confirm_password");
const signupBtn = document.querySelector(".create_account_btn");
const passwordCon = document.querySelector(".password_con1");

const nameErrorCon = document.querySelector(".name_error_msg");
const emailErrorCon = document.querySelector(".email_error_msg");
const phoneNoErrorCon = document.querySelector(".phoneNo_error_msg");
const passwordErrorCon = document.querySelector(".password_error_msg");
const confirmPasswordErrorCon = document.querySelector(
  ".confirm_password_error_msg",
);
const form = document.querySelector(".signup_form");
const errorCons = form.querySelectorAll(".error_con");
("use strict");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const errors = validateSignup({
    name: signupNameInput,
    password: signupPasswordInput,
    confirm_password: confirmPasswordInput,
    phoneNo: signupPhoneInput,
    email: signupEmailInput,
  });

  if (Object.keys(errors).length) {
    renderError(errors);
    return;
  }
  auth.signup(
    signupNameInput,
    signupPasswordInput,
    signupEmailInput,
    signupPhoneInput,
  );
  clearErrorMsg();
  console.log(auth.getUserArray());
});
