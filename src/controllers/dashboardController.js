import { BankManager } from "../services/BankManager.js";
import { renderTransactions, greetUser } from "../views/dashboardView.js";
const dbUserName = document.querySelector(".user_name");
const dbTotalBal = document.querySelector(".db_total_bal");
const dbAvailableBal = document.querySelector(".db_avail_bal");
const transferBtn = document.querySelector(".transfer_btn");
const topupBtn = document.querySelector(".topup_btn");
const payBillBtn = document.querySelector(".pay_bill_btn");
const moreBtn = document.querySelector(".more_btn");
const accountNoCon = document.querySelector(".account-no");
const transactionsCon = document.querySelector(".transaction_movement_con");
const greetMessage = document.querySelector(".greet");
const openEye = document.querySelector(".open_eye");
const closeEye = document.querySelector(".close_eye");
const eyeCon = document.querySelector(".eye_con");
const notificationCount = document.querySelector(".notification_count");
const notificationIcon = document.querySelectorAll(".notification_icon");
export const dashboardManager = new BankManager();

notificationIcon.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "notificationPage.html";
  });
});
payBillBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "paybills.html";
});

transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "transfers.html";
});

topupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "topup.html";
});
const renderDashboard = function () {
  dbUserName.textContent = dashboardManager.getCurrentUser().fullName;
  dbTotalBal.textContent = dashboardManager.getBalance();
  dbAvailableBal.textContent = dashboardManager.getBalance();
  const transactionDetails = dashboardManager.getTransaction();
  accountNoCon.textContent = `Account Number : ${dashboardManager.getCurrentUser().accountNo}`;
  renderTransactions(dashboardManager.getTransaction(), transactionsCon);
  greetMessage.textContent = `${greetUser()},`;
  notificationCount.textContent =
    dashboardManager.getCurrentUser().notificationMirror.length;
};
renderDashboard();
function clearEyeClasses() {
  openEye.classList.remove("show");
  openEye.classList.remove("remove");
  closeEye.classList.remove("show");
  closeEye.classList.remove("remove");
}
openEye.addEventListener("click", () => {
  clearEyeClasses();
  openEye.classList.add("remove");
  closeEye.classList.remove("remove");
  dbAvailableBal.textContent = "******";
  dbTotalBal.textContent = "******";
});

closeEye.addEventListener("click", () => {
  clearEyeClasses();
  openEye.classList.remove("remove");
  closeEye.classList.add("remove");
  dbTotalBal.textContent = dashboardManager.getBalance();
  dbAvailableBal.textContent = dashboardManager.getBalance();
});
