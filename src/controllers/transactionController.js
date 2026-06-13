"use strict";
import { TransferManager } from "../services/TransactionManager.js";
const filter = [
  "All categories",
  "Bank Deposit",
  "Transfer from",
  "Transfer to",
  "Airtime",
  "Betting",
  "Mobile Data",
  "Cash Deposit",
  "Add Money",
  "Reversal",
];

const transferManager = new TransferManager();
const status = ["All Status", "Successful", "Pending", "Failed", "Reversed"];

const gridCon = document.querySelector(".filter_categories");
const cateDropdown = document.querySelector(".cate_dropdown");
const statusDropdown = document.querySelector(".status_dropdown");
const transactionCon = document.querySelector(".transactions");
const moneyInLabel = document.querySelector(".in");
const moneyOutLabel = document.querySelector(".out");

function renderTransactionsPage() {
  transferManager._renderTransactions(transactionCon);
  moneyInLabel.textContent = transferManager._calcMoneyIn();
  moneyOutLabel.textContent = transferManager._calcMoneyOut();
}
renderTransactionsPage();
cateDropdown.addEventListener("click", () => {
  gridCon.classList.toggle("show");
  renderFilters();
});

statusDropdown.addEventListener("click", () => {
  gridCon.classList.toggle("show");
  renderStatus();
});
function renderFilters() {
  gridCon.innerHTML = "";
  let html = "";
  filter.forEach((fil) => {
    html += `<div class="cate filter">
            <p>${fil}</p>
          </div>`;
  });

  gridCon.innerHTML = html;
}

function renderStatus() {
  gridCon.innerHTML = "";
  let html = "";
  status.forEach((sta) => {
    html += `<div class="cate status"
            <p>${sta}</p>
          </div>`;
  });

  gridCon.innerHTML = html;
}
