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

function clearPageSwitch() {
  signupPage.classList.remove("signup_show");
  loginPage.classList.remove("login_hide");
  loginPage.classList.remove("login_show");
  signupPage.classList.remove("signup_hide");
}

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
const passwordTypeCon = document.querySelector(".password_icon");
const openEye = document.querySelector(".open_eye");
const closedEye = document.querySelector(".closed_eye");

const passwordTypeCon2 = document.querySelector(".password_icon2");
const openEye2 = document.querySelector(".open_eye2");
const closedEye2 = document.querySelector(".closed_eye2");

const clearPasswordInputClasses = () => {
  if (openEye || closedEye) {
    openEye.classList.remove("hide");
    openEye.classList.remove("show");
    closedEye.classList.remove("hide");
    closedEye.classList.remove("show");
  } else return;
};

const clearConfirmPasswordInputClasses = () => {
  if (openEye2 || closedEye2) {
    openEye2.classList.remove("hide");
    openEye2.classList.remove("show");
    closedEye2.classList.remove("hide");
    closedEye2.classList.remove("show");
  } else return;
};
passwordTypeCon.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target.closest(".eye_icon");
  console.log(target);
  if (!target) return;

  if (target.classList.contains("closed_eye")) {
    clearPasswordInputClasses();

    if (signupPasswordInput.type === "password") {
      signupPasswordInput.type = "text";
    }

    closedEye.classList.add("hide");
    openEye.classList.add("show");
    console.log(inputField);
  } else if (target.classList.contains("open_eye")) {
    clearPasswordInputClasses();

    if (signupPasswordInput.type === "text") {
      signupPasswordInput.type = "password";
    }

    closedEye.classList.add("show");
    openEye.classList.add("hide");
  }
});

passwordTypeCon2.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target.closest(".eye_icon2");
  console.log(target);
  if (!target) return;

  if (target.classList.contains("closed_eye2")) {
    clearConfirmPasswordInputClasses();

    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
    }

    closedEye2.classList.add("hide");
    openEye2.classList.add("show");
    console.log(inputField);
  } else if (target.classList.contains("open_eye2")) {
    clearConfirmPasswordInputClasses();

    if (confirmPasswordInput.type === "text") {
      confirmPasswordInput.type = "password";
    }

    closedEye2.classList.add("show");
    openEye2.classList.add("hide");
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrorMsg();
  clearInputFields(loginInputFields);
});
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrorMsg();
  clearInputFields(signupInputFields);
});
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

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  clearPageSwitch();

  signupPage.classList.add("signup_show");
  loginPage.classList.add("login_hide");
  clearErrorMsg();
  clearInputFields(loginInputFields);
});
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  clearPageSwitch();
  signupPage.classList.add("signup_hide");
  loginPage.classList.add("login_show");
  clearErrorMsg();
  clearInputFields(signupInputFields);
});
