"use strict";
import { TransferManager } from "../services/TransactionManager.js";
import { navigatePage } from "../views/dashboardView.js";
const balance = document.querySelector(".trans_bal");
const accountNumberInput = document.querySelector(".account_number_input");
const accountNameInput = document.querySelector(".account_name_input");
const amountInput = document.querySelector(".amount_input");
const transMsgInput = document.querySelector(".transfer_msg_input");
const transferBtn = document.querySelector(".transfer_btn");
const transferManager = new TransferManager();
const transferForm = document.querySelector(".transfer_form");
const bottomNav = document.querySelectorAll(".action_con");

bottomNav.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    bottomNav.forEach((item) => item.classList.remove("active"));
    nav.classList.add("active");
    const target = e.target.closest(".action_con");
    const pageLink = target.dataset.link;
    navigatePage(pageLink);
  });
});
const renderTransferUI = () => {
  transferManager.saveUser();
  balance.textContent = transferManager.getBalance();
};
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    transferManager.transfer({
      accountNo: Number(accountNumberInput.value),
      amount: Number(amountInput.value),
      naration: transMsgInput.value,
    });
    renderTransferUI();
  } catch (err) {
    alert(err.message);
  }
  transferForm.querySelectorAll("input").forEach((input) => (input.value = ""));
});
renderTransferUI();
