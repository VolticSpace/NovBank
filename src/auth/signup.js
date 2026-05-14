const signUpBtns = document.querySelectorAll(".open_acc_btn");
const signUpLink = document.querySelector(".sign_suggestion");
const loginLink = document.querySelector(".login_suggestion");
const signUpPage = document.querySelector(".signup_flex");
const loginPage = document.querySelector(".login_flex");
function clearClass() {
  loginPage.classList.remove("login_hide");
  signUpPage.classList.remove("signup_show");
  signUpPage.classList.remove("signup_hide");
  loginPage.classList.remove("login_show");
}
signUpBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "auth.html";
  });
});
signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  clearClass();
  loginPage.classList.add("login_hide");
  signUpPage.classList.add("signup_show");
});
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  clearClass();
  signUpPage.classList.add("signup_hide");
  loginPage.classList.add("login_show");
});
