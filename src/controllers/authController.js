"use strict";
import { AuthManager } from "../services/AuthManager.js";
import {
  renderError,
  clearErrorMsg,
  clearInputFields,
} from "../views/signupView.js";
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
const signupForm = document.querySelector(".signup_form");
const loginForm = document.querySelector(".login_form");
const errorCons = signupForm.querySelectorAll(".error_con");
const signupInputFields = signupForm.querySelectorAll("input");
const loginInputFields = loginForm.querySelectorAll("input");
const loginBtn = document.querySelector(".login_btn");
const loginEmailInput = document.querySelector(".login_email");
const loginPasswordInput = document.querySelector(".login_password");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    auth.login(
      loginEmailInput.value,
      loginPasswordInput.value,
      loginInputFields,
    );
  } catch (err) {
    renderError({
      general: err.message,
    });
    clearInputFields(loginInputFields);
  }
});

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
  try {
    auth.signup(
      signupNameInput.value,
      signupPasswordInput.value,
      signupEmailInput.value,
      signupPhoneInput.value,
      signupInputFields,
    );
  } catch (err) {
    renderError({
      general: err.message,
    });
    clearInputFields(inputFields);
  }
});
// auth.deleteUsers();
