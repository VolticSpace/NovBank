"use strict";
import { validateSignup } from "../utils/formValidator.js";
import {
  renderError,
  clearErrorMsg,
  clearInputFields,
} from "../views/signupView.js";
import { validators } from "../utils/validators.js";
import { createId, createAccountNo } from "../utils/helpers.js";
export class AuthManager {
  #UserArray;
  #CurrentUser;
  constructor() {
    this.#UserArray = JSON.parse(localStorage.getItem("users")) || [];
    this.#CurrentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  }
  signup(fullName, password, email, phoneNo, fields) {
    const existingUser = this.#UserArray.find((user) => user.email === email);

    if (existingUser) {
      throw new Error("User already exists!");
    }

    const id = createId();
    const user = {
      fullName,
      password,
      email,
      phoneNo,
      accountNo: createAccountNo(),
      id,
      balance: 10000000,
      transactions: [],
      notifications: [
        {
          id,
          userId: 20,
          title: "Registration Completed",
          message:
            "Your account setup has been completed successfully. Welcome to a smarter banking experience with NovaBank, where security, convenience, and reliability come first. Start exploring our services and enjoy effortless banking today.",
          type: "success",
          read: false,
          createdAt: Date.now(),
          icon: "✔",
        },
      ],
    };
    this.addUser(user);
    this.saveUser();
    this.saveCurrentUser(user);
    clearInputFields(fields);
    window.location.href = "dashboard.html";
    return;
  }
  login(email, password, fields) {
    const user = this.#UserArray.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) throw new Error("User does not exist!");
    this.saveCurrentUser(user);
    clearInputFields(fields);
    window.location.href = "dashboard.html";
  }
  addUser(user) {
    this.#UserArray.push(user);
  }
  saveUser() {
    localStorage.setItem("users", JSON.stringify(this.#UserArray));
  }
  getUserArray() {
    return this.#UserArray;
  }
  saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  getCurrentUser() {
    return this.#CurrentUser;
  }
  deleteUsers() {
    localStorage.clear();
  }
}
