"use strict";
import { BankManager } from "./BankManager.js";
import { formatCurrency, formatMovement } from "../utils/helpers.js";
export class TransferManager extends BankManager {
  #balance;
  #moneyIn;
  #moneyOut;
  constructor() {
    super();

    this.#balance = +this.getBalanceAmount();
  }
  _getBalance() {
    return this.#balance;
  }
  _renderTransactions(con) {
    const currentUserTrans = this.getCurrentUser().transactions;
    con.innerHTML = "";
    if (currentUserTrans.length === 0) return;
    let html = "";
    currentUserTrans.forEach((trans) => {
      html += `
      <div class="transaction-item">
        <div class="icon ${trans.type}">${trans.type === "deposit" ? "↑" : "↓"}</div>
        <div class="details">
          <p class="naration">${trans.type}</p>
          <p class="transaction_time">${trans.timestamp}</p>
        </div>
        <div class="amount ${trans.type === "deposit" ? "positive" : "negative"}">
          <p>${formatMovement(trans)}</p>
          <div class="status_label">
            <p class="status">successful</p>
          </div>
        </div>
      </div>
      `;
    });
    con.insertAdjacentHTML("afterbegin", html);
  }
  _calcMoneyIn() {
    const currentUserTrans = this.getCurrentUser().transactions;

    const total = currentUserTrans
      .filter((trans) => trans.type === "deposit")
      .reduce((acc, cur) => acc + cur.amount, 0);

    return formatCurrency(total);
  }

  _calcMoneyOut() {
    const currentUserTrans = this.getCurrentUser().transactions;

    const total = currentUserTrans
      .filter((trans) => trans.type === "transfer")
      .reduce((acc, cur) => acc + cur.amount, 0);

    return formatCurrency(total);
  }
}
