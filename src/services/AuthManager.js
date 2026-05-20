"use strict";
export class AuthManager {
  #UserArray;
  #CurrentUser;
  constructor() {
    this.#UserArray = JSON.parse(localStorage.getItem("users")) || [];
    this.#CurrentUser = null;
  }
  signup(fullName, password, email, phoneNo) {
    const existingUser = this.#UserArray.find((user) => user.email === email);

    if (existingUser) return;
    const user = {
      fullName,
      password,
      email,
      phoneNo,
    };
    this.addUser(user);
    this.saveUser();
    this.#CurrentUser = user;

    return this.#CurrentUser;
  }
  login(email, password) {
    const user = this.#UserArray.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) return;
    this.#CurrentUser = user;
    return this.#CurrentUser;
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
}
