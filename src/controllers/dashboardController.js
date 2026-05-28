import { BankManager } from "../services/BankManager.js";
import { renderTransactions } from "../views/dashboardView.js";
const dbUserName = document.querySelector(".user_name");
const dbTotalBal = document.querySelector(".db_total_bal");
const dbAvailableBal = document.querySelector(".db_avail_bal");
const transferBtn = document.querySelector(".transfer_btn");
const topupBtn = document.querySelector(".topup_btn");
const payBillBtn = document.querySelector(".pay_bill_btn");
const moreBtn = document.querySelector(".more_btn");
const accountNoCon = document.querySelector(".account-no");
const transactionsCon = document.querySelector(".transaction_movement_con");
export const dashboardManager = new BankManager();

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
};
renderDashboard();
console.log(dashboardManager.getTransaction());
